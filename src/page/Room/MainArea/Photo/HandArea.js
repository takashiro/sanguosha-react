
import React from 'react';

import MovableCard from '../../component/MovableCard';

function onCardLeave(motion) {
	const {top, left} = this.node.current.getBoundingClientRect();
	motion.setStartState({
		top,
		left,
		opacity: 0,
	});

	const { area } = this.props;
	this.setState({
		num: area.size(),
	});
}

function cleanCards() {
	const { area } = this.props;
	this.setState(function (prev) {
		const { cards } = prev;
		const num = area.size();
		return {
			num,
			cards: cards.filter(motion => motion.isValid()),
		};
	});
}

function onCardEnter(motion) {
	const {top, left} = this.node.current.getBoundingClientRect();
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

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;

		this.node = React.createRef();
		this.state = {
			num: area.size(),
			cards: [],
		};

		this.onCardEnter = onCardEnter.bind(this);
		this.onCardLeave = onCardLeave.bind(this);
		this.cleanCards = cleanCards.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardenter', this.onCardEnter);
		area.on('cardleave', this.onCardLeave);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardenter', this.onCardEnter);
		area.off('cardleave', this.onCardLeave);
	}

	render() {
		const { cards } = this.state;

		return <div ref={this.node} className="hand-area">
			<div className="card-num">{this.state.num}</div>
			{cards.map(card => <MovableCard key={card.id()} card={card} />)}
		</div>;
	}

}

export default HandArea;
