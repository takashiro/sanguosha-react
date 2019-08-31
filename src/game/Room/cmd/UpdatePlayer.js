
export default function UpdatePlayer(update) {
	let player = this.players.find(player => player.uid() === update.uid);
	if (player) {
		player.setProperty(update.prop, update.value);
	}
}
