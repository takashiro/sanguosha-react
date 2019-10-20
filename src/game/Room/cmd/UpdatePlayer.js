
export default function UpdatePlayer(update) {
	const player = this.players.find((p) => p.uid() === update.uid);
	if (player) {
		player.setProperty(update.prop, update.value);
	}
}
