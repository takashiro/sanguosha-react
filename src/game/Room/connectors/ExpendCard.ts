import {
	Command,
	CardExpenseStruct,
} from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';
import CardExpense from '../../CardExpense';

export default class ExpendCard extends ActionConnector<CardExpenseStruct> {
	constructor() {
		super(Command.ExpendCard);
	}

	process(room: Room, param: CardExpenseStruct): void {
		const player = room.findPlayer(param.player);
		if (!player) {
			return;
		}

		if (!param.card) {
			return;
		}

		const expense = new CardExpense(player, param.card);
		room.expendCard(expense);
		player.expendCard(expense);
	}
}
