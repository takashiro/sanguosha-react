
import EventEmitter from 'events';

class CardPath extends EventEmitter {

	/**
	 * A card move with start and end point
	 * @param {Card[]} cards
	 */
	constructor(cards) {
		super();

		this._cards = cards;
		this._start = null;
		this._end = null;
	}

	/**
	 * The start point
	 * @return {{top: number, left: number}}
	 */
	start() {
		return this._start;
	}

	/**
	 * Sets the start point
	 * @param {number} top
	 * @param {number} left
	 */
	setStart(top, left) {
		this._start = {top, left};
	}

	/**
	 * The end point
	 * @return {{top: number, left: number}}
	 */
	end() {
		return this._end;
	}

	/**
	 * Sets the end point
	 * @param {number} top
	 * @param {number} left
	 */
	setEnd(top, left) {
		this._end = {top, left};
	}

	/**
	 * Cards
	 * @return {Card[]}
	 */
	cards() {
		return this._cards;
	}

	/**
	 * Clone current path as a subpath.
	 * @param {Card} card
	 * @return {CardPath}
	 */
	createSubpath(card) {
		const path = new CardPath([card]);
		const start = this.start();
		if (start) {
			path.setStart(start.top, start.left);
		}
		if (!this._subpaths) {
			this._subpaths = [path];
		} else {
			this._subpaths.push(path);
		}
		return path;
	}

	/**
	 * Returns paths for each card
	 * @return {CardPath[]}
	 */
	subpaths() {
		return this._subpaths;
	}

}

export default CardPath;
