
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

function onCardEnter(path) {
	const cards = path.cards();
	const area = this.node.current;
	const cardNodes = area.children;

	if (cardNodes.length < cards.length) {
		console.error('Error: Card nodes are fewer than card paths');
		const pos = calcCenterPos(area);
		path.setEndPos(pos.top, pos.left);
	} else if (cards.length > 1) {
		const cardNum = cards.length;
		const startPos = path.startPos();
		cards.forEach(function (card, index) {
			const p = path.customize(card);
			p.setStartPos(startPos.top, startPos.left);
			const node = cardNodes[cardNodes.length - cardNum + index];
			const endPos = calcCenterPos(node);
			p.setEndPos(endPos.top, endPos.left);
		});
	} else {
		const finalCardNode = cardNodes[cardNodes.length - 1];
		const pos = calcCenterPos(finalCardNode);
		path.setEndPos(pos.top, pos.left);
	}
}

function onCardAdded(cards) {
	this.setState(function (prev) {
		const cardNum = prev.cardNum + cards.length;
		return {cardNum};
	});
}

function onCardRemoved(cards) {
	this.setState(function (prev) {
		const cardNum = prev.cardNum - cards.length;
		return {cardNum};
	});
}

class HandcardArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;
		const cards = area.cards();
		this.state = {
			cards,
			cardNum: cards.length,
		};
		this.node = React.createRef();

		area.on('cardenter', onCardEnter.bind(this));
	}

	componentDidMount() {
		const area = this.props.area;
		area.on('cardadded', onCardAdded.bind(this));
		area.on('cardremoved', onCardRemoved.bind(this));
	}

	render() {
		let cards = this.state.cards;

		return <div className="handcard-area" ref={this.node}>
			{cards.map(card => <Card key={card.key()} card={card} />)}
		</div>;
	}

}

export default HandcardArea;
