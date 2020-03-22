import { Command } from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';

interface PropertyUpdate {
	uid: number;
	prop: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
}

export default class UpdatePlayer extends ActionConnector<PropertyUpdate> {
	constructor() {
		super(Command.UpdatePlayer);
	}

	process(room: Room, update: PropertyUpdate): void {
		const players = room.getPlayers();
		const player = players.find((p) => p.getUid() === update.uid);
		if (player) {
			player.setProperty(update.prop, update.value);
		}
	}
}
