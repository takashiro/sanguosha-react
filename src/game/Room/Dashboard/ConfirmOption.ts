import { defineMessage } from 'react-intl';
import Option from './Option';

defineMessage({ id: 'confirm' });

export default class ConfirmOption extends Option {
	constructor(enabled: boolean) {
		super('confirm', enabled);
	}
}
