
import CardMotion from '../CardMotion';

export default function MoveCards(move) {
	const from = this.findArea(move.from);
	const to = this.findArea(move.to);

	if (from === to) {
		return;
	}

	// Move cards at back-end
	const cards = from.map(move.cards || new Array(move.cardNum).fill(null));
	from.remove(cards);
	to.add(cards);

	// Play card move animation
	const motion = new CardMotion(cards);
	from.sendOff(motion);
	to.pickUp(motion);
}
