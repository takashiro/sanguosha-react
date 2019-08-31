
import CardMotionGroup from '../CardMotionGroup';

export default function MoveCards(move) {
	const from = this.findArea(move.from);
	const to = this.findArea(move.to);

	// Move cards at back-end
	const cards = from.remove(move.cards || new Array(move.cardNum).fill(null));
	to.own(cards);

	// Play card move animation
	const motion = new CardMotionGroup(cards);
	from.sendOff(motion);
	to.pickUp(motion);
	this.emit('cardmove', motion);
}
