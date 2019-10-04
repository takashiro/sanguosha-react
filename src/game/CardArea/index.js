
import EventEmitter from 'events';

import Type from './Type';

class CardArea extends EventEmitter {

	/**
	 * Create a card area
	 * @param {CardArea.Type} type
	 */
	constructor(type) {
		super();

		this._type = type;
		this._cards = [];
		this._enabled = false;
	}

	type() {
		return this._type;
	}

	cards() {
		return this._cards;
	}

	size() {
		return this._cards.length;
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this._cards.push(...cards);
		this.emit('cardadded', cards);
		this.emit('numchanged', this._cards.length);
	}

	/**
	 * Remove cards into this area
	 * @param {Card[]} cards
	 */
	remove(cards) {
		for (let card of cards) {
			let pos = this._cards.indexOf(card);
			if (pos >= 0) {
				this._cards.splice(pos, 1);
			}
		}
		this.emit('cardremoved', cards);
		this.emit('numchanged', this._cards.length);
	}

	/**
	 * Map meta objects from server to cards in this area
	 * @param {object[]} meta
	 * @return {Card[]} cards
	 */
	map(metas) {
		return metas.map(meta => {
			if (typeof meta === 'number') {
				return this._cards.find(card => card.id() === meta);
			} else {
				return this._cards.find(card => card.id() === meta.id);
			}
		});
	}

	/**
	 * Sets the start point of a card motion group
	 * @param {CardMotion} motion
	 */
	sendOff(motion) {
		this.emit('cardleave', motion);
	}

	/**
	 * Sets the end point of a card motion group
	 * @param {CardMotion} motion
	 */
	pickUp(motion) {
		this.emit('cardenter', motion);
	}

	/**
	 * Returns whether the area is enabled.
	 * @return {boolean}
	 */
	isEnabled() {
		return this._enabled;
	}

	/**
	 * Enable or disable the area
	 */
	setEnabled(enabled) {
		if (this._enabled === enabled) {
			return;
		}

		this._enabled = enabled;
		this.emit('enabledchanged', enabled);
	}

}

CardArea.Type = Type;

export default CardArea;
