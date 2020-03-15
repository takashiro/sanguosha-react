import { EventEmitter } from 'events';
import { CardAreaType } from '@karuta/sanguosha-core';

import Card from './Card';
import CardMotion from './CardMotion';

interface CardMeta {
	id: number;
}

class CardArea extends EventEmitter {
	type: CardAreaType;

	cards: Card[];

	enabled: boolean;

	selectableCards: number[];

	selectedCards: number[];

	/**
	 * Create a card area
	 * @param type
	 */
	constructor(type: CardAreaType) {
		super();

		this.type = type;
		this.cards = [];
		this.enabled = false;
		this.selectableCards = [];
		this.selectedCards = [];
	}

	getType(): CardAreaType {
		return this.type;
	}

	getCards(): Card[] {
		return this.cards;
	}

	get size(): number {
		return this.cards.length;
	}

	/**
	 * Add cards into this area
	 * @param cards
	 */
	add(cards: Card[]): void {
		this.cards.push(...cards);
		this.emit('cardAdded', cards);
		this.emit('numChanged', this.cards.length);
	}

	/**
	 * Remove cards into this area
	 * @param cards
	 */
	remove(cards: Card[]): void {
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
	 * @param meta
	 * @return cards
	 */
	map(metas: (number | CardMeta)[]): Card[] {
		const cards: Card[] = [];
		for (const meta of metas) {
			let card: Card | undefined;
			if (typeof meta === 'number') {
				card = this.cards.find((c) => c.getId() === meta);
			} else {
				card = this.cards.find((c) => c.getId() === meta.id);
			}
			if (card) {
				cards.push(card);
			}
		}
		return cards;
	}

	/**
	 * Sets the start point of a card motion group
	 * @param {CardMotion} motion
	 */
	sendOff(motion: CardMotion): void {
		this.emit('cardLeaving', motion);
	}

	/**
	 * Sets the end point of a card motion group
	 * @param motion
	 */
	pickUp(motion: CardMotion): void {
		this.emit('cardEntering', motion);
	}

	/**
	 * @return whether the area is enabled.
	 */
	isEnabled(): boolean {
		return this.enabled;
	}

	/**
	 * Enable or disable the area
	 */
	setEnabled(enabled: boolean): void {
		if (this.enabled === enabled) {
			return;
		}

		this.enabled = enabled;
		this.emit('enabledChanged', enabled);
	}


	/**
	 * Get selectable card ids.
	 * It changes when a request comes.
	 * @return {number[]}
	 */
	getSelectableCards(): number[] {
		return this.selectableCards;
	}

	/**
	 * Set selectable card ids.
	 * @param cards
	 */
	setSelectableCards(cards: number[]): void {
		this.selectableCards = cards;
		this.emit('selectableCardsChanged', cards);
	}

	/**
	 * @return selected card ids.
	 */
	getSelectedCards(): number[] {
		return this.selectedCards;
	}

	/**
	 * Set selected card ids.
	 * @param {number[]} cards
	 */
	setSelectedCards(cards: number[]): void {
		this.selectedCards = cards;
		this.emit('selectedCardsChanged', cards);
	}
}

export default CardArea;
