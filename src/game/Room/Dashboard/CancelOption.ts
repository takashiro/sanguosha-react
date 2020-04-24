import Option from './Option';

export default class Cancel extends Option {
	constructor(enabled: boolean) {
		super('取消', enabled, 'cancel');
	}
}
