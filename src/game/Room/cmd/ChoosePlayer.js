
export default function ChoosePlayer(options) {
	const locker = this.lock();

	const { feasible } = options;
	const dashboard = this.getDashboard();

	const onSelectedPlayerChanged = (player) => {
		const selected = player.isSelected();
		this.reply(locker, { player: player.getSeat(), selected });
	};
	this.once('selectedPlayerChanged', onSelectedPlayerChanged);

	if (feasible) {
		dashboard.setConfirmListener(() => {
			this.off('selectedPlayerChanged', onSelectedPlayerChanged);
			this.resetSelection();
			dashboard.resetSelection();
			this.reply(locker, { confirm: true });
		});
	}
	dashboard.setConfirmEnabled(feasible);

	dashboard.setCancelListener(() => {
		this.off('selectedPlayerChanged', onSelectedPlayerChanged);
		this.resetSelection();
		dashboard.resetSelection();
		this.reply(locker, { cancel: true });
	});
	dashboard.setCancelEnabled(true);

	this.once('lockerChanged', () => {
		this.off('selectedPlayerChanged', onSelectedPlayerChanged);
	});

	const { candidates } = options;
	for (const player of this.getPlayers()) {
		const selectable = candidates.includes(player.getSeat());
		if (selectable) {
			player.setSelectable(true);
		} else if (!player.isSelected()) {
			player.setSelectable(false);
		}
	}
	this.setSelectable(true);
}
