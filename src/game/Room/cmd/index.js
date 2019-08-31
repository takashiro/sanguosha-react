
import cmd from '../../../protocol';

import ArrangeSeats from './ArrangeSeats';
import UpdatePlayer from './UpdatePlayer';
import MoveCards from './MoveCards';

const bindMap = new Map;
bindMap.set(cmd.ArrangeSeats, ArrangeSeats);
bindMap.set(cmd.UpdatePlayer, UpdatePlayer);
bindMap.set(cmd.MoveCards, MoveCards);

export default bindMap;
