import React from 'react';
import { CardColor } from '@karuta/sanguosha-core';

import './index.scss';

interface NumberProps {
	color: CardColor;
	number: number;
}

export default function CardNumber(props: NumberProps): JSX.Element {
	const { color, number } = props;
	const style = {
		backgroundImage: `url(style/card/number/${CardColor[color].toLowerCase()}/${number}.png)`,
	};

	return <div className="number" style={style} />;
}
