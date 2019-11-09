import EventEmitter from 'events';

class Dashboard extends EventEmitter {
	constructor(uid) {
		super();

		this.uid = uid;
		this.player = null;
		this.confirmEnabled = false;
		this.cancelEnabled = false;
		this.finishEnabled = false;
	}

	getUid() {
		return this.uid;
	}

	getPlayer() {
		return this.player;
	}

	setPlayer(player) {
		this.player = player;
		player.on('phaseChanged', () => this.reset());
		this.emit('playerChanged', player);
	}

	getSelectedCards() {
		const areas = [
			this.player.getHandArea(),
			this.player.getEquipArea(),
		];

		const cards = [];
		for (const area of areas) {
			cards.push(...area.getSelectedCards());
		}
		return cards;
	}

	isConfirmEnabled() {
		return this.confirmEnabled;
	}

	setConfirmEnabled(enabled) {
		this.confirmEnabled = enabled;
		this.emit('confirmEnabledChanged', enabled);
	}

	isCancelEnabled() {
		return this.cancelEnabled;
	}

	setCancelEnabled(enabled) {
		this.cancelEnabled = enabled;
		this.emit('cancelEnabledChanged', enabled);
	}

	isFinishEnabled() {
		return this.finishEnabled;
	}

	setFinishEnabled(enabled) {
		this.finishEnabled = enabled;
		this.emit('finishEnabledChanged', enabled);
	}

	setEnabled(enabled) {
		this.setConfirmEnabled(enabled);
		this.setCancelEnabled(enabled);
		this.setConfirmEnabled(enabled);
	}

	confirm() {
		this.emit('confirm');
	}

	cancel() {
		this.emit('cancel');
	}

	finish() {
		this.emit('finish');
	}

	/**
	 * Reset selectable cards, selected cards and disable all buttons.
	 */
	reset() {
		this.setEnabled(false);
		const areas = [
			this.player.getHandArea(),
			this.player.getEquipArea(),
		];
		for (const area of areas) {
			area.setEnabled(false);
			area.setSelectableCards([]);
			area.setSelectedCards([]);
		}
	}
}

export default Dashboard;
