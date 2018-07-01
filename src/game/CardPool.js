
import Card from './Card';

class CardPool {

	constructor() {
		this._pool = new Map;
	}

	/**
	 * Create or re-use an instance of card
	 * @param {object} info
	 */
	create(info) {
		if (!info || !info.id) {
			throw new Error('Unexpected card instance: ' + JSON.stringify(info));
		}

		let card = this._pool.get(info.id);
		if (card) {
			return card;
		}

		card = new Card(info);
		Object.freeze(card);
		this._pool.set(card.id(), card);

		return card;
	}

}

export default CardPool;
