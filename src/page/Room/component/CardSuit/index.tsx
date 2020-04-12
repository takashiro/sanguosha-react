import React from 'react';
import { CardSuit as Suit } from '@karuta/sanguosha-core';

import './index.scss';

interface SuitProps {
	suit: Suit;
}

export default function CardSuit(props: SuitProps): JSX.Element {
	const { suit } = props;
	return <div className={`suit ${Suit[suit].toLowerCase()}`} />;
}
