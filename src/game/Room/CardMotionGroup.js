

import EventEmitter from 'events';
import CardMotion from './CardMotion';

class CardMotionGroup extends EventEmitter {

	/**
	 * A card motion with start and end point
	 * @param {Card[]} cards
	 */
	constructor(cards) {
		super();

		this._cards = cards;
		this._startPos = null;
		this._endPos = null;
		this._children = null;
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
	 * Returns cards.
	 * @return {Card[]}
	 */
	cards() {
		return this._cards;
	}

	/**
	 * Prepare card motions.
	 */
	prepare() {
		if (this._children !== null) {
			return;
		}

		const cardNum = this._cards.length;
		if (cardNum <= 0) {
			this._children = [];
		} else {
			const midIndex = (cardNum - 1) / 2;
			const startPos = this._startPos || {};
			const endPos = this._endPos || {};
			const offset = cardNum <= 5 ? 30 : 150 / cardNum;
			this._children = this._cards.map(function (card, index) {
				const motion = new CardMotion(card);
				motion.setStartPos(startPos.top, startPos.left + offset * (index - midIndex));
				motion.setEndPos(endPos.top, endPos.left + offset * (index - midIndex));
				return motion;
			});
		}
	}

	/**
	 * Returns paths for each card
	 * @return {CardPath[]}
	 */
	children() {
		return this._children;
	}

	/**
	 * It resolves when all motions are finished
	 * @return {Promise}
	 */
	finished() {
		if (!this._children) {
			return Promise.resolve();
		}

		return Promise.all(this._children.map(function (motion) {
			return new Promise(function (resolve) {
				motion.once('finished', resolve);
			});
		}));
	}

	/**
	 * Destroy the whole motion group.
	 */
	destroy() {
		if (!this._children) {
			return;
		}

		for (const motion of this._children) {
			motion.destroy();
		}
		this._children = null;
		this.emit('destroyed');
	}

	/**
	 * It resolves when all motions are destroyed
	 * @return {Promise}
	 */
	destroyed() {
		if (!this._children) {
			return Promise.resolve();
		}

		return new Promise(resolve => this.once('destroyed', resolve));
	}

}

export default CardMotionGroup;

