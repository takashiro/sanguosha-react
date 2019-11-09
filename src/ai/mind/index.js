
import cmd from '../../protocol';

import ChooseGeneral from './ChooseGeneral';
import ChooseCards from './ChooseCards';
import Play from './Play';

function bindMind(client) {
	client.bind(cmd.ChooseGeneral, ChooseGeneral);
	client.bind(cmd.ChooseCards, ChooseCards);
	client.bind(cmd.Play, Play);
}

export default bindMind;
