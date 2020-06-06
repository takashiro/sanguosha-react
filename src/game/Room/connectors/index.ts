import ActionConnector from '../ActionConnector';

import AddSkill from './AddSkill';
import ArrangeSeats from './ArrangeSeats';
import ChooseCards from './ChooseCards';
import ChoosePlayer from './ChoosePlayer';
import ExpendCard from './ExpendCard';
import MoveCards from './MoveCards';
import Play from './Play';
import UpdatePlayer from './UpdatePlayer';
import UseCard from './UseCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectors: (new() => ActionConnector<any>)[] = [
	AddSkill,
	ArrangeSeats,
	ChooseCards,
	ChoosePlayer,
	ExpendCard,
	MoveCards,
	Play,
	UpdatePlayer,
	UseCard,
];

export default connectors;
