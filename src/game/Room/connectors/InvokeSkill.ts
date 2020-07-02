import { defineMessages } from 'react-intl';
import { Command } from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';
import ConfirmOption from '../Dashboard/ConfirmOption';
import CancelOption from '../Dashboard/CancelOption';

const desc = defineMessages({
	invokeSkill: {
		id: 'prompt.choose-to-invoke-skill',
		defaultMessage: 'Do you want to invoke {skill}?',
	},
});

export default class InvokeSkill extends ActionConnector<string[]> {
	constructor() {
		super(Command.InvokeSkill);
	}

	process(room: Room, skills: string[]): void {
		const client = room.getClient();
		const locker = client.lock();
		const dashboard = room.getDashboard();
		if (skills.length === 1) {
			dashboard.showPrompt(desc.invokeSkill.id, { skill: `skill.${skills[0]}` });
			const confirm = new ConfirmOption(true);
			confirm.once('clicked', () => {
				client.reply(locker, 0);
			});
			const cancel = new CancelOption(true);
			cancel.once('clicked', () => {
				client.reply(locker, -1);
			});
			dashboard.showOptions([confirm, cancel]);
		}
	}
}
