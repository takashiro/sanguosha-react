
import EventEmitter from 'events';

class CardPath extends EventEmitter {

	/**
	 * A card move with start and end point
	 * @param {Card[]} cards
	 */
	constructor(cards) {
		super();

		this._cards = cards;
		this._startPos = null;
		this._end = null;
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
		return this._end;
	}

	/**
	 * Sets the end point
	 * @param {number} top
	 * @param {number} left
	 */
	setEndPos(top, left) {
		this._end = {top, left};
	}

	/**
	 * Returns cards.
	 * @return {Card[]}
	 */
	cards() {
		return this._cards;
	}

	/**
	 * Returns the first card.
	 * @return {Card}
	 */
	card() {
		return this._cards[0];
	}

	/**
	 * Customize path for a card.
	 * @param {Card} card
	 * @return {CardPath}
	 */
	customize(card) {
		const path = new CardPath([card]);
		if (!this._children) {
			this._children = [path];
		} else {
			this._children.push(path);
		}
		return path;
	}

	/**
	 * Check if this path contains multiple subpaths.
	 * @return {boolean}
	 */
	isCustomized() {
		return !!this._children;
	}

	/**
	 * Returns paths for each card
	 * @return {CardPath[]}
	 */
	children() {
		return this._children;
	}

	/**
	 * Destroy the path to indicate animation is done.
	 */
	destroy() {
		if (!this._cards) {
			return;
		}

		this._startPos = null;
		this._end = null;
		this._cards = null;
		this._children = null;
		this.emit('destroyed');
	}

}

export default CardPath;
