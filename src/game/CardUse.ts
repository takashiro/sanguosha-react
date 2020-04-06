import { CardMeta as Card } from '@karuta/sanguosha-core';

import Player from './Player';

export default class CardUse {
	from: Player;

	card: Card;

	to?: Player[];

	constructor(from: Player, card: Card, to?: Player[]) {
		this.from = from;
		this.card = card;
		this.to = to;
	}
}
