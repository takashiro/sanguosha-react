import React from 'react';
import {
	MessageDescriptor,
	IntlShape,
	injectIntl,
	defineMessages,
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
	intl: IntlShape;
}

class InlineCardArea extends React.Component<AreaProps, {}> {
	handleClick = (card: Card): void => {
		const { area } = this.props;
		area.setSelectedCards([card.getId()]);
	}

	render(): JSX.Element {
		const { area } = this.props;
		const { intl } = this.props;
		const cards = area.getCards();
		return (
			<div className="inline-card-area">
				<h4>{intl.formatMessage(tr(area.getType()))}</h4>
				<CardList cards={cards} onClick={this.handleClick} />
			</div>
		);
	}
}

export default injectIntl(InlineCardArea);
