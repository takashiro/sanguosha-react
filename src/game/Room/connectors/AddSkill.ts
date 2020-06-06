import {
	Command,
	SkillChangeStruct,
} from '@karuta/sanguosha-core';

import Skill from '../../Skill';
import ActionConnector from '../ActionConnector';
import Room from '../Room';

export default class AddSkill extends ActionConnector<SkillChangeStruct> {
	constructor() {
		super(Command.AddSkill);
	}

	process(room: Room, change: SkillChangeStruct): void {
		const player = room.findPlayer(change.owner);
		if (!player) {
			return;
		}

		const area = player.findSkillArea(change.area);
		const skill = new Skill(change.name, change.tags);
		area.add(skill);
	}
}
