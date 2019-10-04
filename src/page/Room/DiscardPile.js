import React from 'react';
import MovableCard from './component/MovableCard';

import './DiscardPile.scss';

function onCardEnter(motion) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motion.setEndState({
		top,
		left,
		opacity: 1,
	});
	motion.moveBy({
		top: -top,
		left: -left,
	});

	for (const card of motion.cards()) {
		card.once('destroyed', this.cleanCards);
	}

	this.setState(function (prev) {
		return {
			cards: [
				...prev.cards,
				...motion.cards(),
			],
		};
	});
}

function onCardLeave(motion) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motion.setStartPos({
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
