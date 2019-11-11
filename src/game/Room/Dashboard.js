import EventEmitter from 'events';

class Dashboard extends EventEmitter {
	constructor(uid) {
		super();

		this.uid = uid;
		this.player = null;
		this.confirmEnabled = false;
		this.confirmListener = null;
		this.cancelEnabled = false;
		this.cancelListener = null;
		this.finishEnabled = false;
		this.finishListener = null;
	}

	getUid() {
		return this.uid;
	}

	getPlayer() {
		return this.player;
	}

	setPlayer(player) {
		this.player = player;
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
		this.setFinishEnabled(enabled);
	}

	setConfirmListener(listener) {
		this.confirmListener = listener;
	}

	confirm() {
		if (this.isConfirmEnabled() && this.confirmListener) {
			this.confirmListener();
		}
	}

	setCancelListener(listener) {
		this.cancelListener = listener;
	}

	cancel() {
		if (this.isCancelEnabled() && this.cancelListener) {
			this.cancelListener();
		}
	}

	setFinishListener(listener) {
		this.finishListener = listener;
	}

	finish() {
		if (this.isFinishEnabled() && this.finishListener) {
			this.finishListener();
		}
	}

	/**
	 * Reset selectable cards, selected cards and disable all buttons.
	 */
	resetSelection() {
		this.setEnabled(false);
		this.confirmListener = null;
		this.cancelListener = null;
		this.finishListener = null;
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
