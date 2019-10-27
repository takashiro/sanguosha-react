
import CardArea from './CardArea';
import Card from './Card';

class CardPile extends CardArea {
	constructor(type) {
		super(type);
		this.cardNum = 0;
	}

	/**
	 * Gets the number of cards
	 * @return {number}
	 */
	get size() {
		return this.cardNum;
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this.cardNum += cards.length;
		this.emit('cardAdded', cards);
		this.emit('numChanged', this.cardNum);
	}

	/**
	 * Remove cards into this area
	 * @param {Card[]} cards
	 * @return {Card[]}
	 */
	remove(cards) {
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
	map(metas) {
		return metas.map((meta) => new Card(meta));
	}
}

CardPile.Type = {
	Draw: CardArea.Type.DrawPile,
	Discard: CardArea.Type.DiscardPile,
	Hand: CardArea.Type.Hand,
};

export default CardPile;
