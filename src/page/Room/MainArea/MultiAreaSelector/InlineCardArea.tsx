import React from 'react';
import {
	MessageDescriptor,
	defineMessages,
	useIntl,
} from 'react-intl';
import { CardAreaType } from '@karuta/sanguosha-core';

import Card from '../../../../game/Card';
import CardArea from '../../../../game/CardArea';

import CardList from '../../component/CardList';

const desc = defineMessages({
	handArea: { id: 'hand-area' },
	equipArea: { id: 'equip-area' },
	judgeArea: { id: 'judge-area' },
	other: { id: 'other' },
});

function tr(area: CardAreaType): MessageDescriptor {
	switch (area) {
	case CardAreaType.Hand:
		return desc.handArea;
	case CardAreaType.Equip:
		return desc.equipArea;
	case CardAreaType.Judge:
		return desc.judgeArea;
	default:
		return desc.other;
	}
}

interface AreaProps {
	area: CardArea;
}

function InlineCardArea(props: AreaProps): JSX.Element {
	const { area } = props;
	const intl = useIntl();

	const handleClick = React.useCallback((card: Card): void => {
		area.setSelectedCards([card.getId()]);
	}, [area]);

	const cards = area.getCards();
	return (
		<div className="inline-card-area">
			<h4>{intl.formatMessage(tr(area.getType()))}</h4>
			<CardList cards={cards} onClick={handleClick} />
		</div>
	);
}

export default InlineCardArea;
