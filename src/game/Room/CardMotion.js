
import EventEmitter from 'events';
import MovableCard from './MovableCard';

/**
 * @typedef MotionState
 * @property {number} top
 * @property {number} left
 * @property {number} opacity
 */

class CardMotion extends EventEmitter {
	/**
	 * A card motion with start state and end state
	 * @param {Card[]} cards
	 */
	constructor(cards) {
		super();


		this._cards = cards ? cards.map((card) => new MovableCard(card)) : [];
	}

	/**
	 * Sets the start state
	 * @param {MotionState} state
	 */
	setStartState(state) {
		const cardNum = this._cards.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this._cards.forEach((card, index) => {
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
	setEndState(state) {
		const cardNum = this._cards.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this._cards.forEach((card, index) => {
			card.setEndState({
				top: state.top,
				left: state.left + offset * (index - midIndex),
				opacity: state.opacity,
			});
		});
	}

	/**
	 * Move start state and end state by an offset
	 * @param {{top: number, left: number}} offset
	 */
	moveBy(offset) {
		for (const card of this._cards) {
			card.moveBy(offset);
		}
	}

	/**
	 * Returns all movable cards
	 * @return {MovableCard[]}
	 */
	cards() {
		return this._cards;
	}
}

export default CardMotion;
