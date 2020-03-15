import { Command } from '@karuta/sanguosha-core';

import Room from './Room';

abstract class ActionConnector<ParamType> {
	protected command: Command;

	constructor(command: Command) {
		this.command = command;
	}

	getCommand(): Command {
		return this.command;
	}

	abstract proceed(room: Room, params: ParamType): void;
}

export default ActionConnector;
