import { EventEmitter } from 'events';
import { SkillAreaType } from '@karuta/sanguosha-core';

import Skill from './Skill';

interface SkillArea {
	on(event: 'added', listener: (skill: Skill) => void): this;
	on(event: 'removed', listener: (skill: Skill) => void): this;

	once(event: 'added', listener: (skill: Skill) => void): this;
	once(event: 'removed', listener: (skill: Skill) => void): this;

	off(event: 'added', listener: (skill: Skill) => void): this;
	off(event: 'removed', listener: (skill: Skill) => void): this;
}

class SkillArea extends EventEmitter {
	protected type: SkillAreaType;

	protected skills: Skill[];

	constructor(type: SkillAreaType) {
		super();

		this.type = type;
		this.skills = [];
	}

	getType(): SkillAreaType {
		return this.type;
	}

	getSkills(): Skill[] {
		return this.skills;
	}

	add(skill: Skill): void {
		this.skills.push(skill);
		this.emit('added', skill);
	}

	remove(name: string): void {
		const i = this.skills.findIndex((skill) => skill.getName() === name);
		if (i >= 0) {
			const [skill] = this.skills.splice(i, 1);
			this.emit('removed', skill);
		}
	}
}

export default SkillArea;
