
import Player from '../../Player';
import CardArea from '../../CardArea';
import CardPile from '../../CardPile';

function sortPlayerSeat(players, dashboardUid) {
	const dashboardPlayer = players.find((player) => player.getUid() === dashboardUid);
	const dashboardSeat = dashboardPlayer.getSeat();
	const playerNum = players.length;

	function getRelativeSeat(player) {
		let seat = player.getSeat() - dashboardSeat;
		if (seat < 0) {
			seat += playerNum;
		}
		return seat;
	}

	players.sort(function (a, b) {
		const p = getRelativeSeat(a);
		const q = getRelativeSeat(b);
		return p - q;
	});
}

export default function ArrangeSeats(metas) {
	const players = new Array(metas.length);
	for (let i = 0; i < metas.length; i++) {
		const meta = metas[i];
		const player = new Player(meta.uid, meta.seat, meta.name);
		players[i] = player;
		if (player.getUid() === this.getDashboardUid()) {
			player.setHandArea(new CardArea(CardArea.Type.Hand));
		} else {
			player.setHandArea(new CardPile(CardPile.Type.Hand));
		}
		player.setEquipArea(new CardArea(CardArea.Type.Equip));
		player.setJudgeArea(new CardArea(CardArea.Type.Judge));
		player.setProcessArea(new CardArea(CardArea.Type.Process));
	}

	sortPlayerSeat(players, this.getDashboardUid());
	this.dashboard.setPlayer(players[0]);
	this.setPlayers(players);
}
