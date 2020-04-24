import { EventEmitter } from 'events';

let nextId = 1;

interface Option {
	on(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	on(event: 'clicked', listener: () => void): this;

	once(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	once(event: 'clicked', listener: () => void): this;

	off(event: 'enabledChanged', listener: (enabled: boolean) => void): this;
	off(event: 'clicked', listener: () => void): this;
}

class Option extends EventEmitter {
	protected id: number;

	protected text: string;

	protected enabled: boolean;

	protected onClick?: () => void;

	protected className?: string;

	constructor(text: string, enabled = true, className?: string) {
		super();
		this.id = nextId++;
		this.text = text;
		this.enabled = enabled;
		this.className = className;
	}

	getId(): number {
		return this.id;
	}

	getText(): string {
		return this.text;
	}

	isEnabled(): boolean {
		return this.enabled;
	}

	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
		this.emit('enabledChanged', enabled);
	}

	getClassName(): string | undefined {
		return this.className;
	}

	click(): void {
		this.emit('clicked');
	}
}

export default Option;
