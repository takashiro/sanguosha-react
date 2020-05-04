
import React from 'react';

import GameCard from '../../../../game/Card';

import CardSuit from '../CardSuit';
import CardNumber from '../CardNumber';

import './index.scss';

interface Props {
	card?: GameCard;
}

function Card(props: Props): JSX.Element {
	const { card } = props;

	if (card && card.getId()) {
		const classNames = ['card', card.getColor()];
		const style = {
			backgroundImage: `url(style/card/${card.getName()}.png)`,
		};
		return (
			<div className={classNames.join(' ')} style={style}>
				<CardSuit suit={card.getSuit()} />
				<CardNumber color={card.getColor()} number={card.getNumber()} />
			</div>
		);
	}
	return <div className="card back" />;
}

export default Card;
