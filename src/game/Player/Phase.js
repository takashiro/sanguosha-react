
import Enum from '../Enum';

const Phase = new Enum(
	'Invalid',

	'RoundStart',

	'Start',
	'Judge',
	'Draw',
	'Play',
	'Discard',
	'Finish',

	'Inactive',
);

export default Phase;
