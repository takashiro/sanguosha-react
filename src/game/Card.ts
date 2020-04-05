import {
	Card as AbstractCard,
	CardSuit,
	CardType,
	CardSubtype,
} from '@karuta/sanguosha-core';

let cardKey = 0;

export interface CardProps {
	id: number;
	name: string;
	suit: CardSuit;
	number: number;
}

export default class Card extends AbstractCard {
	protected key: number;

	constructor(props: CardProps) {
		if (props) {
			super(props.name, props.suit, props.number);
			this.id = props.id;
			this.name = props.name;
			this.suit = props.suit;
			this.number = props.number;
			this.key = 0;
		} else {
			super('', CardSuit.None, 0);
			this.key = cardKey++;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	getType(): CardType {
		return CardType.Invalid;
	}

	// eslint-disable-next-line class-methods-use-this
	getSubtype(): CardSubtype {
		return CardSubtype.None;
	}

	getKey(): string {
		return this.id ? String(this.id) : `u${this.key}`;
	}
}
