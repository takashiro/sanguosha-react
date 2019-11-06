
import Player from '../../Player';
import CardArea from '../../CardArea';
import CardPile from '../../CardPile';

function sortPlayerSeat() {
	const dashboardPlayer = this.players.find((player) => player.getUid() === this.getDashboardUid());
	const dashboardSeat = dashboardPlayer.getSeat();
	const playerNum = this.players.length;

	function getRelativeSeat(player) {
		let seat = player.getSeat() - dashboardSeat;
		if (seat < 0) {
			seat += playerNum;
		}
		return seat;
	}

	this.players.sort(function (a, b) {
		const p = getRelativeSeat(a);
		const q = getRelativeSeat(b);
		return p - q;
	});
}

export default function ArrangeSeats(metas) {
	this.players = new Array(metas.length);
	for (let i = 0; i < metas.length; i++) {
		const meta = metas[i];
		const player = new Player(meta.uid, meta.seat, meta.name);
		this.players[i] = player;
		if (player.getUid() === this.getDashboardUid()) {
			player.handArea = new CardArea(CardArea.Type.Hand);
		} else {
			player.handArea = new CardPile(CardPile.Type.Hand);
		}
		player.equipArea = new CardArea(CardArea.Type.Equip);
		player.delayedTrickArea = new CardArea(CardArea.Type.DelayedTrick);
		player.judgeArea = new CardArea(CardArea.Type.Judge);
	}

	sortPlayerSeat.call(this);

	const me = this.getDashboardPlayer();
	this.dashboard.setPlayer(me);

	this.emit('playerChanged', this.players);
}
