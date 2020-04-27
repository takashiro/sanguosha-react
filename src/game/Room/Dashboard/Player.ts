import { CardAreaType } from '@karuta/sanguosha-core';

import Player from '../../Player';
import CardArea from '../../CardArea';

export default class DashboardPlayer extends Player {
	protected handArea: CardArea;

	constructor(uid: number, seat: number, name: string) {
		super(uid, seat, name);

		this.handArea = new CardArea(CardAreaType.Hand, seat);
	}

	getHandArea(): CardArea {
		return this.handArea;
	}
}
