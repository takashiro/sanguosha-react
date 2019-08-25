
import CardArea from './CardArea';
import Card from './Card';

class DrawPile extends CardArea {

	constructor() {
		super(CardArea.Type.DrawPile);
	}


	/**
	 * Add cards into this area
	 * @param {Card[]} cards
	 */
	add(cards) {
		this.emit('cardadded', cards);
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

export default DrawPile;
