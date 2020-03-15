
import { EventEmitter } from 'events';

import MovableCard from './MovableCard';
import Card from './Card';
import MotionState from './MotionState';
import MotionPosition from './MotionPosition';

/**
 * @typedef MotionState
 * @property {number} top
 * @property {number} left
 * @property {number} opacity
 */

class CardMotion extends EventEmitter {
	cards: MovableCard[];

	/**
	 * A card motion with start state and end state
	 * @param cards
	 */
	constructor(cards: Card[]) {
		super();


		this.cards = cards ? cards.map((card) => new MovableCard(card)) : [];
	}

	/**
	 * Sets the start state
	 * @param {MotionState} state
	 */
	setStartState(state: MotionState): void {
		const cardNum = this.cards.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this.cards.forEach((card, index) => {
			card.setStartState({
				top: state.top,
				left: state.left + offset * (index - midIndex),
				opacity: state.opacity,
			});
		});
	}

	/**
	 * Sets the end state
	 * @param {MotionState} state
	 */
	setEndState(state: MotionState): void {
		const cardNum = this.cards.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this.cards.forEach((card, index) => {
			card.setEndState({
				top: state.top,
				left: state.left + offset * (index - midIndex),
				opacity: state.opacity,
			});
		});
	}

	/**
	 * Move start state and end state by an offset
	 * @param offset
	 */
	moveBy(offset: MotionPosition): void {
		for (const card of this.cards) {
			card.moveBy(offset);
		}
	}

	/**
	 * @return all movable cards
	 */
	getCards(): MovableCard[] {
		return this.cards;
	}
}

export default CardMotion;
