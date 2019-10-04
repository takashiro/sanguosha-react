
import EventEmitter from 'events';

let serial = 1;

class MovableCard extends EventEmitter {

	/**
	 * A card move with start and end states
	 * @param {Card} card
	 */
	constructor(card) {
		super();

		this._id = serial++;
		this._card = card;
		this._startState = null;
		this._endState = null;
	}

	id() {
		return this._id;
	}

	width() {
		return 93;
	}

	height() {
		return 130;
	}

	/**
	 * The start state
	 * @return {MotionState}
	 */
	startState() {
		return this._startState;
	}

	/**
	 * Sets the start point
	 * @param {MotionState} state
	 */
	setStartState(state) {
		this._startState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * The end point
	 * @return {MotionState}
	 */
	endState() {
		return this._endState;
	}

	/**
	 * Sets the end point
	 * @param {MotionState} state
	 */
	setEndState(state) {
		this._endState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * Move start state and end state by an offset
	 * @param {{top: number, left: number}} offset
	 */
	moveBy(offset) {
		if (this._startState) {
			this._startState.top += offset.top;
			this._startState.left += offset.left;
		}
		if (this._endState) {
			this._endState.top += offset.top;
			this._endState.left += offset.left;
		}
	}

	/**
	 * Returns the first card.
	 * @return {Card}
	 */
	instance() {
		return this._card;
	}

	/**
	 * Check if it is the same card.
	 * @param {MovableCard} card
	 */
	equals(card) {
		return this.instance() === card.instance();
	}

	/**
	 * Check if the motion is still valid.
	 * @return {boolean}
	 */
	isValid() {
		return Boolean(this._card);
	}

	/**
	 * Destroy the path to indicate animation is done.
	 */
	destroy() {
		if (!this._card) {
			return;
		}

		this._startState = null;
		this._endState = null;
		this._card = null;
		this.emit('destroyed');
	}

}

export default MovableCard;

/**
 * @typedef MotionState
 * @property {number} top
 * @property {number} left
 * @property {number} opacity
 */
