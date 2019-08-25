
import React from 'react';

import Card from '../../component/Card';

import './index.scss';

function onCardEnter(path) {
	const rect = this.node.current.parentElement.getBoundingClientRect();
	const centerTop = (rect.top + rect.bottom) / 2;
	const centerLeft = (rect.left + rect.right) / 2;
	path.setEnd(centerTop, centerLeft);
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
