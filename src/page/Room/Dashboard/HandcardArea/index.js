
import React from 'react';

import Card from '../../component/Card';

import './index.scss';

class HandcardArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;
		this.state = {
			cards: area.cards(),
		};
	}

	componentDidMount() {
		const area = this.props.area;

		this._onCardAdded = cards => {
			this.setState(prev => {
				prev.cards.push(...cards);
				return {cards: prev.cards};
			});
		};
		area.on('cardAdded', this._onCardAdded);
	}

	componentWillUnmount() {
		const area = this.props.area;
		area.removeListener('cardAdded', this._onCardAdded);
	}

	render() {
		let cards = this.state.cards;

		return <div className="handcard-area">
			{cards.map(card => <Card
				key={card.id()}
				name={card.name()}
				suit={card.suitString().toLowerCase()}
				color={card.color()}
				number={card.number()}
			/>)}
		</div>;
	}

}

export default HandcardArea;
