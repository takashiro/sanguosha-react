import React from 'react';
import { CardAreaType } from '@karuta/sanguosha-core';

import Card from '../../../../game/Card';
import CardArea from '../../../../game/CardArea';

import CardList from '../../component/CardList';

function tr(area: CardAreaType): string {
	switch (area) {
	case CardAreaType.Hand:
		return '手牌区';
	case CardAreaType.Equip:
		return '装备区';
	case CardAreaType.Judge:
		return '判定区';
	default:
		return '其他';
	}
}

interface AreaProps {
	area: CardArea;
}

export default class InlineCardArea extends React.Component<AreaProps, {}> {
	handleClick = (card: Card): void => {
		const { area } = this.props;
		area.setSelectedCards([card.getId()]);
	}

	render(): JSX.Element {
		const { area } = this.props;
		const cards = area.getCards();
		return (
			<div className="inline-card-area">
				<h4>{tr(area.getType())}</h4>
				<CardList cards={cards} onClick={this.handleClick} />
			</div>
		);
	}
}
