
import CardMotionGroup from '../CardMotionGroup';
import Card from '../../Card';

export default function MoveCards(move) {
	const from = this.findArea(move.from);
	const to = this.findArea(move.to);

	// Move cards at back-end
	const cards = from.map(move.cards || new Array(move.cardNum).fill(null));
	from.remove(cards);
	to.add(cards);

	// Play card move animation
	const motion = new CardMotionGroup(cards);
	from.sendOff(motion);
	to.pickUp(motion);
}
