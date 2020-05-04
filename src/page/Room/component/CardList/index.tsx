import React from 'react';

import Card from '../../../../game/Card';
import ClickableCard from '../ClickableCard';

interface ListProps {
	cards: Card[];
	onClick?: (card: Card) => void;
}

export default function CardList(props: ListProps): JSX.Element | null {
	const { cards } = props;
	if (cards.length <= 0) {
		return null;
	}

	const { onClick } = props;
	return (
		<div className="card-list">
			{cards.map((card) => (
				<ClickableCard
					key={card.getKey()}
					card={card}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
