import { defineMessage } from 'react-intl';
import Option from './Option';

defineMessage({ id: 'cancel' });

export default class Cancel extends Option {
	constructor(enabled: boolean) {
		super('cancel', enabled);
	}
}
