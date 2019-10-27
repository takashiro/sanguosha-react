
import EventEmitter from 'events';

let serial = 1;

class MovableCard extends EventEmitter {
	/**
	 * A card move with start and end states
	 * @param {Card} card
	 */
	constructor(card) {
		super();

		this.id = serial++;
		this.card = card;
		this.startState = null;
		this.endState = null;
		this.selected = false;
		this.width = 93;
		this.height = 130;
	}

	getId() {
		return this.id;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	isSelected() {
		return this.selected;
	}

	setSelected(selected) {
		this.selected = selected;
		this.emit('selectedChanged', selected);
	}

	/**
	 * The start state
	 * @return {MotionState}
	 */
	getStartState() {
		return this.startState;
	}

	/**
	 * Sets the start point
	 * @param {MotionState} state
	 */
	setStartState(state) {
		this.startState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * The end point
	 * @return {MotionState}
	 */
	getEndState() {
		return this.endState;
	}

	/**
	 * Sets the end point
	 * @param {MotionState} state
	 */
	setEndState(state) {
		this.endState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * Move start state and end state by an offset
	 * @param {{top: number, left: number}} offset
	 */
	moveBy(offset) {
		if (this.startState) {
			this.startState.top += offset.top;
			this.startState.left += offset.left;
		}
		if (this.endState) {
			this.endState.top += offset.top;
			this.endState.left += offset.left;
		}
	}

	/**
	 * Move the card into a new state
	 * @param {MotionState} state
	 */
	goTo(state) {
		this.startState = this.endState;
		this.endState = {
			...this.endState,
			...state,
		};

		this.emit('move');
	}

	/**
	 * Returns the first card.
	 * @return {Card}
	 */
	instance() {
		return this.card;
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
		return Boolean(this.card);
	}

	/**
	 * Destroy the path to indicate animation is done.
	 */
	destroy() {
		if (!this.card) {
			return;
		}

		this.startState = null;
		this.endState = null;
		this.card = null;
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
