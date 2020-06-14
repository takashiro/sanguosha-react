import { defineMessage } from 'react-intl';
import Option from './Option';

defineMessage({ id: 'confirm' });

export default class Confirm extends Option {
	constructor(enabled: boolean) {
		super('confirm', enabled);
	}
}
