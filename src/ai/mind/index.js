
import cmd from '../../protocol';

import chooseGeneral from './chooseGeneral';

function bindMind(client) {
	client.bind(cmd.ChooseGeneral, chooseGeneral);
}

export default bindMind;
