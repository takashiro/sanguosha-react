import Option from './Option';

export default class Confirm extends Option {
	constructor(enabled: boolean) {
		super('确定', enabled, 'confirm');
	}
}
