
import Enum from '../Enum';

const Phase = new Enum(
	'Invalid',

	'Start',
	'Judge',
	'Draw',
	'Play',
	'Discard',
	'Finish',

	'Inactive',
);

export default Phase;
