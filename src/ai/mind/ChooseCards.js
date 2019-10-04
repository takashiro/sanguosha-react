

import cmd from '../../protocol';

export default function ChooseCards() {
	this.send(cmd.ChooseCards, []);
}
