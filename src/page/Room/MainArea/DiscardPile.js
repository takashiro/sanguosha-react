import React from 'react';
import MovableCard from '../component/MovableCard';

import './DiscardPile.scss';

function onCardEnter(motions) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motions.setEndState({
		top,
		left,
		opacity: 1,
	});
	motions.moveBy({
		top: -top,
		left: -left,
	});

	for (const card of motions.children()) {
		card.once('destroyed', this.cleanCards);
	}

	this.setState(function (prev) {
		return {
			cards: [
				...prev.cards,
				...motions.children(),
			],
		};
	});
}

function onCardLeave(motions) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motions.setStartPos({
		top,
		left,
		opacity: 0,
	});
}

function cleanCards() {
	this.setState(function (prev) {
		return {
			cards: prev.cards.filter(card => card.isValid()),
		};
	});
}

class DiscardPile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cards: [],
		};

		this.node = React.createRef();

		this.cleanCards = cleanCards.bind(this);
		this.onCardEnter = onCardEnter.bind(this);
		this.onCardLeave = onCardLeave.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardleave', this.onCardLeave);
		area.on('cardenter', this.onCardEnter);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardleave', this.onCardLeave);
		area.off('cardenter', this.onCardEnter);
	}

	render() {
		const { cards } = this.state;
		return <div ref={this.node} className="discard-pile">
			{cards.map(card => <MovableCard key={card.id()} card={card} />)}
		</div>;
	}

}

export default DiscardPile;
