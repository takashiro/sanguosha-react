import { CardMeta as Card } from '@karuta/sanguosha-core';

import Player from './Player';

export default class CardExpense {
	player: Player;

	card: Card;

	constructor(player: Player, card: Card) {
		this.player = player;
		this.card = card;
	}
}
