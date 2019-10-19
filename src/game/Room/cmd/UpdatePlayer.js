
export default function UpdatePlayer(update) {
	const player = this.players.find((player) => player.uid() === update.uid);
	if (player) {
		player.setProperty(update.prop, update.value);
	}
}
