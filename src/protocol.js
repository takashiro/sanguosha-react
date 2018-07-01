
import Enum from './net/Enum';
import net from './net/protocol';

const cmd = new Enum(
	...net.enums,
	'StartGame',
	'ArrangeSeats',
	'ChooseGeneral',
	'UpdatePlayer',
	'ToBattle',
	'MoveCards',
);

export default cmd;
