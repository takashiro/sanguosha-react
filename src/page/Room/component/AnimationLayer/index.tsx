import React from 'react';

import { CardSuit, CardMeta } from '@karuta/sanguosha-core';

import AnimationMeta from '../../../../game/Animation';
import CardUse from '../../../../game/CardUse';
import Player from '../../../../game/Player';

import Animation from '../Animation';
import * as CardAnimation from '../Animation/Card';

import './index.scss';
import CardExpense from '../../../../game/CardExpense';

interface AnimationData extends AnimationMeta {
	id: number;
}

interface LayerProps {
	player: Player;
}

interface LayerState {
	animations: AnimationData[];
}

let nextAnimationId = 1;

export default class AnimationLayer extends React.Component<LayerProps, LayerState> {
	constructor(props: LayerProps) {
		super(props);

		this.state = {
			animations: [],
		};
	}

	componentDidMount(): void {
		const { player } = this.props;
		player.on('cardUsed', this.handleCardUse);
		player.on('cardExpended', this.handleCardExpense);
	}

	componentWillUnmount(): void {
		const { player } = this.props;
		player.off('cardUsed', this.handleCardUse);
		player.off('cardExpended', this.handleCardExpense);
	}

	handleCardUse = (use: CardUse): void => {
		this.addAnimationByCard(use.card);
	};

	handleCardExpense = (expense: CardExpense): void => {
		this.addAnimationByCard(expense.card);
	};

	handleAnimationEnd = (id: number): void => {
		this.setState((prev) => {
			const { animations } = prev;
			for (let i = 0; i < animations.length; i++) {
				if (animations[i].id === id) {
					animations.splice(i, 1);
					break;
				}
			}
			return { animations };
		});
	};

	addAnimationByCard(card: CardMeta): void {
		if (card.name === 'strike') {
			if (card.suit === CardSuit.Heart || card.suit === CardSuit.Diamond) {
				this.addAnimation(CardAnimation.RedStrike);
			} else {
				this.addAnimation(CardAnimation.BlackStrike);
			}
		} else {
			const animation = CardAnimation.map.get(card.name);
			if (animation) {
				this.addAnimation(animation);
			}
		}
	}

	addAnimation(animation: AnimationMeta): void {
		this.setState((prev) => {
			const { animations } = prev;
			animations.push({
				id: nextAnimationId++,
				...animation,
			});
			return { animations };
		});
	}

	render(): JSX.Element {
		const { animations } = this.state;

		return (
			<div className="animation-layer">
				{animations.map((meta) => (
					<Animation
						key={`ani-${meta.id}`}
						meta={meta}
						id={meta.id}
						onEnd={this.handleAnimationEnd}
					/>
				))}
			</div>
		);
	}
}
