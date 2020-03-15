import ActionConnector from '../ActionConnector';

import ArrangeSeats from './ArrangeSeats';
import UpdatePlayer from './UpdatePlayer';
import MoveCards from './MoveCards';
import ChooseCards from './ChooseCards';
import Play from './Play';
import ChoosePlayer from './ChoosePlayer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createActionConnectors(): ActionConnector<any>[] {
	return [
		new ArrangeSeats(),
		new UpdatePlayer(),
		new MoveCards(),
		new ChooseCards(),
		new Play(),
		new ChoosePlayer(),
	];
}
