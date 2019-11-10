
export default function ChoosePlayer(options) {
	const locker = this.lock();

	const { feasible } = options;
	const dashboard = this.getDashboard();
	dashboard.setConfirmEnabled(feasible);

	dashboard.once('cancel', () => {
		this.reset();
		this.reply(locker, { cancel: true });
	});

	const { candidates } = options;
	for (const player of this.getPlayers()) {
		player.setSelectable(candidates.includes(player.getSeat()));
	}
	this.setSelectable(true);
}
