import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '../../../../game/Card';

import CardSuit from '../CardSuit';
import CardNumber from '../CardNumber';

import './index.scss';

interface EquipProps {
	card: Card;
}

interface EquipState {
	selectable: boolean;
	selected: boolean;
}

export default class Equip extends React.Component<EquipProps, EquipState> {
	constructor(props: EquipProps) {
		super(props);

		this.state = {
			selectable: false,
			selected: false,
		};
	}

	render(): JSX.Element {
		const { card } = this.props;

		const {
			selectable,
			selected,
		} = this.state;

		const classNames = ['equip'];
		if (selectable) {
			classNames.push('selectable');
		}
		if (selected) {
			classNames.push('selected');
		}

		return (
			<div className={classNames.join(' ')}>
				<i className="icon sword" />
				<span className="attack-range" />
				<span className="name">
					<FormattedMessage id={`card.${card.getName()}`} />
				</span>
				<CardSuit suit={card.getSuit()} />
				<CardNumber color={card.getColor()} number={card.getNumber()} />
			</div>
		);
	}
}
