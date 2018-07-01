
import Suit from './Suit';

class Card {

	constructor(props) {
		this._id = props.id;
		this._name = props.name;
		this._suit = props.suit;
		this._number = props.number;
	}

	id() {
		return this._id;
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
		switch(this._suit) {
		case Suit.Spade:
		case Suit.Club:
			return 'black';
		case Suit.Heart:
		case Suit.Diamond:
			return 'red';
		}

		return '';
	}

	number() {
		return this._number;
	}

}

Card.Suit = Suit;

export default Card;
