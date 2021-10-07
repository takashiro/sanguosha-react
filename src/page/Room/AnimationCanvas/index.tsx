import React from 'react';

import { Kingdom } from '@karuta/sanguosha-core';

import Room from '../../../game/Room';
import CardUse from '../../../game/CardUse';
import Player from '../../../game/Player';

import IndicatorLine from './IndicatorLine';

import './index.scss';

interface CanvasProps {
	room: Room;
}

interface Indicator {
	id: number;
	from: Player;
	to: Player;
}

interface CanvasState {
	indicators: Indicator[];
}

let nextIndicatorId = 1;

export default class AnimationCanvas extends React.Component<CanvasProps, CanvasState> {
	constructor(props: CanvasProps) {
		super(props);

		this.state = {
			indicators: [],
		};
	}

	componentDidMount(): void {
		const { room } = this.props;
		room.on('cardUsed', this.handleCardUse);
	}

	componentWillUnmount(): void {
		const { room } = this.props;
		room.off('cardUsed', this.handleCardUse);
	}

	handleCardUse = (use: CardUse): void => {
		this.setState((prev) => {
			const { indicators } = prev;

			if (use.to) {
				for (const to of use.to) {
					indicators.push({
						id: nextIndicatorId++,
						from: use.from,
						to,
					});
				}
			}

			return { indicators };
		});
	}

	handleIndicatorEnd = (id?: number): void => {
		if (!id) {
			return;
		}

		this.setState((prev) => {
			const { indicators } = prev;
			for (let i = 0; i < indicators.length; i++) {
				if (indicators[i].id === id) {
					indicators.splice(i, 1);
					break;
				}
			}
			return { indicators };
		});
	}

	render(): JSX.Element {
		const { indicators } = this.state;
		return (
			<div className="animation-canvas">
				{indicators.map(
					(indicator) => (
						<IndicatorLine
							id={indicator.id}
							key={`indicator-${indicator.id}`}
							from={indicator.from.getPosition()}
							to={indicator.to.getPosition()}
							styleClass={Kingdom[indicator.from.getKingdom()].toLowerCase()}
							onEnd={this.handleIndicatorEnd}
						/>
					),
				)}
			</div>
		);
	}
}
