
import EventEmitter from 'events';

class CardMotion extends EventEmitter {

	/**
	 * A card move with start and end point
	 * @param {Card} card
	 */
	constructor(card) {
		super();

		this._card = card;
		this._startPos = null;
		this._endPos = null;
		this._finished = false;
	}

	/**
	 * The start point
	 * @return {{top: number, left: number}}
	 */
	startPos() {
		return this._startPos;
	}

	/**
	 * Sets the start point
	 * @param {number} top
	 * @param {number} left
	 */
	setStartPos(top, left) {
		this._startPos = {top, left};
	}

	/**
	 * The end point
	 * @return {{top: number, left: number}}
	 */
	endPos() {
		return this._endPos;
	}

	/**
	 * Sets the end point
	 * @param {number} top
	 * @param {number} left
	 */
	setEndPos(top, left) {
		this._endPos = {top, left};
	}

	/**
	 * Returns the first card.
	 * @return {Card}
	 */
	card() {
		return this._card;
	}

	/**
	 * Check if the motion is finished.
	 * @return {boolean}
	 */
	isFinished() {
		return this._finished;
	}

	/**
	 * Sets the motion as finished.
	 * @param {boolean} finished
	 */
	setFinished(finished) {
		this._finished = finished;
		this.emit('finished');
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

		this._startPos = null;
		this._endPos = null;
		this._card = null;
		this.emit('destroyed');
	}

}

export default CardMotion;
