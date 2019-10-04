

import EventEmitter from 'events';
import CardMotion from './CardMotion';

/**
 * @typedef MotionState
 * @property {number} top
 * @property {number} left
 * @property {number} opacity
 */

class CardMotionGroup extends EventEmitter {

	/**
	 * A card motion with start state and end state
	 * @param {Card[]} cards
	 */
	constructor(cards) {
		super();


		this._children = cards ? cards.map(card => new CardMotion(card)) : [];
	}

	/**
	 * Sets the start state
	 * @param {MotionState} state
	 */
	setStartState(state) {
		const cardNum = this._children.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this._children.forEach((child, index) => {
			child.setStartState({
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
		const cardNum = this._children.length;
		const midIndex = (cardNum - 1) / 2;
		const offset = cardNum <= 5 ? 30 : 150 / cardNum;

		this._children.forEach((child, index) => {
			child.setEndState({
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
		for (const child of this._children) {
			child.moveBy(offset);
		}
	}

	/**
	 * Returns paths for each card
	 * @return {CardPath[]}
	 */
	children() {
		return this._children;
	}

}

export default CardMotionGroup;

