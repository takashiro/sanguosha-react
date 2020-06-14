import { defineMessage } from 'react-intl';
import Option from './Option';

defineMessage({ id: 'finish' });

export default class FinishOption extends Option {
	constructor(enabled: boolean) {
		super('finish', enabled);
	}
}
