import {
	Command,
	CardAreaLocator,
} from '@karuta/sanguosha-core';

import CardMotion from '../../CardMotion';
import ActionConnector from '../ActionConnector';
import Room from '../Room';
import { CardProps } from '../../Card';

interface CardMoveMeta {
	from: CardAreaLocator;
	to: CardAreaLocator;
	cards?: CardProps[];
	cardNum?: number;
}

export default class MoveCards extends ActionConnector<CardMoveMeta> {
	constructor() {
		super(Command.MoveCards);
	}

	process(room: Room, move: CardMoveMeta): void {
		const from = room.findArea(move.from);
		const to = room.findArea(move.to);
		if (from === to || !from || !to) {
			return;
		}

		// Move cards at back-end
		const cards = from.map(move.cards || new Array(move.cardNum).fill(null));
		from.remove(cards);
		to.add(cards);

		// Play card move animation
		const motion = new CardMotion(cards);
		from.sendOff(motion);
		to.pickUp(motion);
	}
}
