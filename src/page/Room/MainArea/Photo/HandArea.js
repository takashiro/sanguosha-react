
import React from 'react';

import MovableCard from '../../component/MovableCard';

function onCardLeaving(motion) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motion.setStartState({
		top,
		left,
		opacity: 0,
	});

	const { area } = this.props;
	this.setState({
		num: area.size,
	});
}

function cleanCards() {
	const { area } = this.props;
	this.setState(function (prev) {
		const { cards } = prev;
		const num = area.size;
		return {
			num,
			cards: cards.filter((motion) => motion.isValid()),
		};
	});
}

function onCardEntering(motion) {
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

class HandArea extends React.Component {
	constructor(props) {
		super(props);

		const { area } = props;

		this.node = React.createRef();
		this.state = {
			num: area.size,
			cards: [],
		};

		this.onCardEntering = onCardEntering.bind(this);
		this.onCardLeaving = onCardLeaving.bind(this);
		this.cleanCards = cleanCards.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardEntering', this.onCardEntering);
		area.on('cardLeaving', this.onCardLeaving);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardEntering', this.onCardEntering);
		area.off('cardLeaving', this.onCardLeaving);
	}

	render() {
		const { cards } = this.state;
		const { num } = this.state;

		return (
			<div ref={this.node} className="hand-area">
				<div className="card-num">{num}</div>
				{cards.map((card) => <MovableCard key={card.getSerial()} card={card} />)}
			</div>
		);
	}
}

export default HandArea;
