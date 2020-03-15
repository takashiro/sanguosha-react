
import { CardAreaType } from '@karuta/sanguosha-core';

import CardArea from './CardArea';
import Card, { CardProps } from './Card';

class CardPile extends CardArea {
	protected cardNum: number;

	constructor(type: CardAreaType) {
		super(type);
		this.cardNum = 0;
	}

	/**
	 * @return the number of cards
	 */
	get size(): number {
		return this.cardNum;
	}

	/**
	 * Add cards into this area
	 * @param cards
	 */
	add(cards: Card[]): void {
		this.cardNum += cards.length;
		this.emit('cardAdded', cards);
		this.emit('numChanged', this.cardNum);
	}

	/**
	 * Remove cards from this area
	 * @param cards
	 */
	remove(cards: Card[]): void {
		this.cardNum -= cards.length;
		this.emit('cardRemoved', cards);
		this.emit('numChanged', this.cardNum);
	}

	/**
	 * Map meta objects to cards in this pile.
	 * @param {object[]} metas
	 * @return {Card[]}
	 */
	// eslint-disable-next-line class-methods-use-this
	map(metas: CardProps[]): Card[] {
		return metas.map((meta) => new Card(meta));
	}
}

export default CardPile;
