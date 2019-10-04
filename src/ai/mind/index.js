
import cmd from '../../protocol';

import ChooseGeneral from './ChooseGeneral';
import ChooseCards from './ChooseCards';

function bindMind(client) {
	client.bind(cmd.ChooseGeneral, ChooseGeneral);
	client.bind(cmd.ChooseCards, ChooseCards);
}

export default bindMind;
