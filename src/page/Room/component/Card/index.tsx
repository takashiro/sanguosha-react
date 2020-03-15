
import React from 'react';
import { CardColor, CardSuit } from '@karuta/sanguosha-core';

import GameCard from '../../../../game/Card';

import './index.scss';

interface Props {
	card: GameCard;
}

function Card(props: Props): JSX.Element {
	const { card } = props;

	if (card.getId()) {
		const classNames = ['card', card.getColor()];
		const style = {
			backgroundImage: `url(style/card/${card.getName()}.png)`,
		};
		return (
			<div className={classNames.join(' ')} style={style}>
				<div className={`suit ${CardSuit[card.getSuit()].toLowerCase()}`} />
				<div
					className="number"
					style={{
						backgroundImage: `url(style/card/number/${CardColor[card.getColor()].toLowerCase()}/${card.getNumber()}.png)`,
					}}
				/>
			</div>
		);
	}
	return <div className="card back" />;
}

export default Card;
