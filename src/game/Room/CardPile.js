
import CardArea from '../CardArea';
import Card from '../Card';

class CardPile extends CardArea {

	/**
	 * Add ownership of cards going into this area
	 * @param {Card[]} cards
	 */
	own(cards) {
		this.emit('cardowned', cards);
	}

	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this.emit('cardadded', cards);
		this.emit('numchanged', this._cards.length);
	}

	/**
	 * Remove cards into this area
	 * @param {object[]} cards
	 * @return {Card[]}
	 */
	remove(metas) {
		const cards = metas.map(meta => new Card(meta));
		this.emit('cardremoved', cards);
		return cards;
	}

}

CardPile.Type = {
	Draw: CardArea.Type.DrawPile,
	Discard: CardArea.Type.DiscardPile,
};

export default CardPile;
