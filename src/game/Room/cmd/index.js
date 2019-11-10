
import cmd from '../../../protocol';

import ArrangeSeats from './ArrangeSeats';
import UpdatePlayer from './UpdatePlayer';
import MoveCards from './MoveCards';
import ChooseCards from './ChooseCards';
import Play from './Play';
import ChoosePlayer from './ChoosePlayer';

const bindMap = new Map();
bindMap.set(cmd.ArrangeSeats, ArrangeSeats);
bindMap.set(cmd.UpdatePlayer, UpdatePlayer);
bindMap.set(cmd.MoveCards, MoveCards);
bindMap.set(cmd.ChooseCards, ChooseCards);
bindMap.set(cmd.Play, Play);
bindMap.set(cmd.ChoosePlayer, ChoosePlayer);

export default bindMap;
