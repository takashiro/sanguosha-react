import React from 'react';

import Card from '../../../../game/Card';

import './index.scss';

interface IconProps {
	card: Card;
}

export default function CardIcon(props: IconProps): JSX.Element {
	const { card } = props;
	return (
		<div className="card-icon">
			<img src={`style/card/icon/${card.getName()}.png`} />
		</div>
	);
}
