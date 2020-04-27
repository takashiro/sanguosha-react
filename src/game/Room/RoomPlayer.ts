import { CardAreaType } from '@karuta/sanguosha-core';

import Player from '../Player';
import CardPile from '../CardPile';

export default class RoomPlayer extends Player {
	protected handArea: CardPile;

	constructor(uid: number, seat: number, name: string) {
		super(uid, seat, name);

		this.handArea = new CardPile(CardAreaType.Hand, seat);
	}

	getHandArea(): CardPile {
		return this.handArea;
	}
}
