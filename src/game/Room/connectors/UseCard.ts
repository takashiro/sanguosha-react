import {
	Command,
	CardUseStruct,
} from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';
import CardUse from '../../CardUse';

export default class UseCard extends ActionConnector<CardUseStruct> {
	constructor() {
		super(Command.UseCard);
	}

	process(room: Room, param: CardUseStruct): void {
		const from = room.findPlayer(param.from);
		if (!from) {
			return;
		}

		if (!param.card) {
			return;
		}

		const use = new CardUse(from, param.card);
		if (param.to) {
			use.to = [];
			for (const seat of param.to) {
				const target = room.findPlayer(seat);
				if (target) {
					use.to.push(target);
				}
			}
		}

		room.useCard(use);
	}
}
