
import cmd from '../../../protocol';

import ArrangeSeats from './ArrangeSeats';
import UpdatePlayer from './UpdatePlayer';
import MoveCards from './MoveCards';
import ChooseCards from './ChooseCards';

const bindMap = new Map;
bindMap.set(cmd.ArrangeSeats, ArrangeSeats);
bindMap.set(cmd.UpdatePlayer, UpdatePlayer);
bindMap.set(cmd.MoveCards, MoveCards);
bindMap.set(cmd.ChooseCards, ChooseCards);

export default bindMap;
