
import React from 'react';

import Card from '../../component/Card';

import './index.scss';

function calcCenterPos(node) {
	const rect = node.getBoundingClientRect();
	return {
		top: (rect.top + rect.bottom) / 2,
		left: (rect.left + rect.right) / 2,
	};
}

function onCardEnter(motion) {
	const cards = motion.cards();
	const area = this.node.current;
	const cardNodes = area.children;

	if (cardNodes.length < cards.length) {
		console.error('Error: Card nodes are fewer than card paths');
		const pos = calcCenterPos(area);
		motion.setEndPos(pos.top, pos.left);

	} else if (cards.length > 1) {
		const cardNum = cards.length;

		motion.prepare();
		const motions = motion.children();
		for (let i = 0; i < motions.length; i++) {
			const m = motions[i];
			const node = cardNodes[cardNodes.length - cardNum + i];
			const endPos = calcCenterPos(node);
			m.setEndPos(endPos.top, endPos.left);
		}

	} else {
		const finalCardNode = cardNodes[cardNodes.length - 1];
		const pos = calcCenterPos(finalCardNode);
		motion.setEndPos(pos.top, pos.left);
	}
}

function onCardOwned(cards) {
	this.setState(function (prev) {
		const incomingCards = prev.incomingCards;
		incomingCards.push(...cards);
		return {incomingCards};
	});
}

function onCardUpdated() {
	const cards = this.props.area.cards();
	this.setState({
		cards: [...cards],
		incomingCards: [],
	});
}

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;
		const cards = area.cards();
		this.state = {
			cards: [...cards],
			incomingCards: [],
			cardNum: cards.length,
		};
		this.node = React.createRef();
	}

	componentDidMount() {
		const area = this.props.area;
		area.on('cardenter', onCardEnter.bind(this));
		area.on('cardowned', onCardOwned.bind(this));

		const updateCard = onCardUpdated.bind(this);
		area.on('cardadded', updateCard);
		area.on('cardremoved', updateCard);
	}

	render() {
		const cards = this.state.cards;
		const incomingCards = this.state.incomingCards;
		return <div className="hand-area" ref={this.node}>
			{cards.map(card => <Card key={card.key()} card={card} />)}
			{incomingCards.map(card => <Card key={card.key()} card={card} visibility="hidden" />)}
		</div>;
	}

}

export default HandArea;
