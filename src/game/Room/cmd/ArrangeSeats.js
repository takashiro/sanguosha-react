
import Player from '../../Player';

function sortPlayerSeat() {
	const dashboardPlayer = this.players.find(player => player.uid() === this.dashboardUid);
	const dashboardSeat = dashboardPlayer.seat();
	const playerNum = this.players.length;

	function getRelativeSeat(player) {
		let seat = player.seat() - dashboardSeat;
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

export default function ArrangeSeats(players) {
	this.players = [];
	for (let props of players) {
		let player = new Player(props.uid, props.seat, props.name);
		this.players.push(player);
	}

	sortPlayerSeat.call(this);
	this.emit('playerChanged', this.players);
}
