
import EventEmitter from 'events';

import Type from './Type';

class CardArea extends EventEmitter {
	/**
	 * Create a card area
	 * @param {CardArea.Type} type
	 */
	constructor(type) {
		super();

		this.type = type;
		this.cards = [];
		this.enabled = false;
	}

	getType() {
		return this.type;
	}

	getCards() {
		return this.cards;
	}

	get size() {
		return this.cards.length;
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this.cards.push(...cards);
		this.emit('cardAdded', cards);
		this.emit('numChanged', this.cards.length);
	}

	/**
	 * Remove cards into this area
	 * @param {Card[]} cards
	 */
	remove(cards) {
		for (const card of cards) {
			const pos = this.cards.indexOf(card);
			if (pos >= 0) {
				this.cards.splice(pos, 1);
			}
		}
		this.emit('cardRemoved', cards);
		this.emit('numChanged', this.cards.length);
	}

	/**
	 * Map meta objects from server to cards in this area
	 * @param {object[]} meta
	 * @return {Card[]} cards
	 */
	map(metas) {
		return metas.map((meta) => {
			if (typeof meta === 'number') {
				return this.cards.find((card) => card.getId() === meta);
			}
			return this.cards.find((card) => card.getId() === meta.id);
		});
	}

	/**
	 * Sets the start point of a card motion group
	 * @param {CardMotion} motion
	 */
	sendOff(motion) {
		this.emit('cardLeaving', motion);
	}

	/**
	 * Sets the end point of a card motion group
	 * @param {CardMotion} motion
	 */
	pickUp(motion) {
		this.emit('cardEntering', motion);
	}

	/**
	 * Returns whether the area is enabled.
	 * @return {boolean}
	 */
	isEnabled() {
		return this.enabled;
	}

	/**
	 * Enable or disable the area
	 */
	setEnabled(enabled) {
		if (this.enabled === enabled) {
			return;
		}

		this.enabled = enabled;
		this.emit('enabledChanged', enabled);
	}
}

CardArea.Type = Type;

export default CardArea;
