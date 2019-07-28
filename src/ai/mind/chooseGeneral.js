

import cmd from '../../protocol';

export default function chooseGeneral(option) {
	const num = parseInt(option.num, 10) || 1;
	//const sameKingdom = !!option.sameKingdom;
	const generals = option.generals || [];
	const selected = generals.slice(0, num).map(g => g.id);

	this.send(cmd.ChooseGeneral, selected);
}
