import { EventEmitter } from 'events';
import { SkillTag } from '@karuta/sanguosha-core';

interface Skill {
	on(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	on(event: 'activeChanged', listener: (active: boolean) => void): this;

	once(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	once(event: 'activeChanged', listener: (active: boolean) => void): this;

	off(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	off(event: 'activeChanged', listener: (active: boolean) => void): this;
}

class Skill extends EventEmitter {
	protected name: string;

	protected tags?: Set<SkillTag>;

	protected enabled: boolean;

	protected active: boolean;

	constructor(name: string, tags?: SkillTag[]) {
		super();

		this.name = name;
		this.tags = tags ? new Set(tags) : undefined;
		this.enabled = false;
		this.active = false;
	}

	getName(): string {
		return this.name;
	}

	hasTag(tag: SkillTag): boolean {
		return this.tags ? this.tags?.has(tag) : false;
	}

	isEnabled(): boolean {
		return this.enabled;
	}

	setEnabled(enabled: boolean): void {
		if (this.enabled === enabled) {
			return;
		}

		this.enabled = enabled;
		this.emit('enabledChanged', enabled);
	}

	isActive(): boolean {
		return this.active;
	}

	setActive(active: boolean): void {
		if (this.active === active) {
			return;
		}

		this.active = active;
		this.emit('activeChanged', active);
	}
}

export default Skill;
