import React from 'react';
import MovableCard from './component/MovableCard';

import './DiscardPile.scss';

function onCardEntering(motion) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motion.moveBy({
		top: -top,
		left: -left,
	});
	motion.setEndState({
		top: 0,
		left: 0,
		opacity: 1,
	});

	for (const card of motion.getCards()) {
		card.once('destroyed', this.cleanCards);
	}

	this.setState(function (prev) {
		return {
			cards: [
				...prev.cards,
				...motion.getCards(),
			],
		};
	});
}

function onCardLeaving(motion) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motion.setStartState({
		top,
		left,
		opacity: 0,
	});
}

function cleanCards() {
	this.setState(function (prev) {
		return {
			cards: prev.cards.filter((card) => card.isValid()),
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
		this.onCardEntering = onCardEntering.bind(this);
		this.onCardLeaving = onCardLeaving.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardLeaving', this.onCardLeaving);
		area.on('cardEntering', this.onCardEntering);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardLeaving', this.onCardLeaving);
		area.off('cardEntering', this.onCardEntering);
	}

	render() {
		const { cards } = this.state;
		return (
			<div ref={this.node} className="discard-pile">
				{cards.map((card) => <MovableCard key={card.getId()} card={card} />)}
			</div>
		);
	}
}

export default DiscardPile;
