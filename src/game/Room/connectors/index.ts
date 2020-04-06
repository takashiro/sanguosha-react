import ActionConnector from '../ActionConnector';

import ArrangeSeats from './ArrangeSeats';
import ChooseCards from './ChooseCards';
import ChoosePlayer from './ChoosePlayer';
import MoveCards from './MoveCards';
import Play from './Play';
import UpdatePlayer from './UpdatePlayer';
import UseCard from './UseCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectors: (new() => ActionConnector<any>)[] = [
	ArrangeSeats,
	UpdatePlayer,
	MoveCards,
	ChooseCards,
	Play,
	ChoosePlayer,
	UseCard,
];

export default connectors;
