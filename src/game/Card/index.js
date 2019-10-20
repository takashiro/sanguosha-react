
import Suit from './Suit';

let cardKey = 0;

class Card {
	constructor(props) {
		if (props) {
			this._id = props.id;
			this._name = props.name;
			this._suit = props.suit;
			this._number = props.number;
		} else {
			this._key = cardKey++;
		}
	}

	id() {
		return this._id;
	}

	key() {
		return this._id || `u${this._key}`;
	}

	name() {
		return this._name;
	}

	suit() {
		return this._suit;
	}

	suitString() {
		return Suit.fromNum(this._suit);
	}

	color() {
		switch (this._suit) {
		case Suit.Spade:
		case Suit.Club:
			return 'black';
		case Suit.Heart:
		case Suit.Diamond:
			return 'red';
		default:
			return '';
		}
	}

	number() {
		return this._number;
	}
}

Card.Suit = Suit;

export default Card;
