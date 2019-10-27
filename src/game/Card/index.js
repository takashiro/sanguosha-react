
import Suit from './Suit';

let cardKey = 0;

class Card {
	constructor(props) {
		if (props) {
			this.id = props.id;
			this.name = props.name;
			this.suit = props.suit;
			this.number = props.number;
		} else {
			this.key = cardKey++;
		}
	}

	getId() {
		return this.id;
	}

	getKey() {
		return this.id || `u${this.key}`;
	}

	getName() {
		return this.name;
	}

	getSuit() {
		return this.suit;
	}

	getSuitString() {
		return Suit.fromNum(this.suit);
	}

	getColor() {
		switch (this.suit) {
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

	getNumber() {
		return this.number;
	}
}

Card.Suit = Suit;

export default Card;
