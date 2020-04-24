import Option from './Option';

export default class FinishOption extends Option {
	constructor(enabled: boolean) {
		super('结束出牌', enabled, 'finish');
	}
}
