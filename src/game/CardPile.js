
import CardArea from './CardArea';
import Card from './Card';

class CardPile extends CardArea {

	constructor(type) {
		super(type);
		this._cardNum = 0;
	}

	/**
	 * Gets the number of cards
	 * @return {number}
	 */
	size() {
		return this._cardNum;
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this._cardNum += cards.length;
		this.emit('cardAdded', cards);
		this.emit('numChanged', this._cardNum);
	}

	/**
	 * Remove cards into this area
	 * @param {Card[]} cards
	 * @return {Card[]}
	 */
	remove(cards) {
		this._cardNum -= cards.length;
		this.emit('cardRemoved', cards);
		this.emit('numChanged', this._cardNum);
	}

	/**
	 * Map meta objects to cards in this pile.
	 * @param {object[]} metas
	 * @return {Card[]}
	 */
	map(metas) {
		return metas.map(meta => new Card(meta));
	}

}

CardPile.Type = {
	Draw: CardArea.Type.DrawPile,
	Discard: CardArea.Type.DiscardPile,
	Hand: CardArea.Type.Hand,
};

export default CardPile;
