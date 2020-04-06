import ActionConnector from '../ActionConnector';

import ArrangeSeats from './ArrangeSeats';
import UpdatePlayer from './UpdatePlayer';
import MoveCards from './MoveCards';
import ChooseCards from './ChooseCards';
import Play from './Play';
import ChoosePlayer from './ChoosePlayer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectors: (new() => ActionConnector<any>)[] = [
	ArrangeSeats,
	UpdatePlayer,
	MoveCards,
	ChooseCards,
	Play,
	ChoosePlayer,
];

export default connectors;
