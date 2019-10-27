import EventEmitter from 'events';

class Dashboard extends EventEmitter {
	constructor(uid) {
		super();

		this.uid = uid;
		this.player = null;
		this.selectedCards = [];
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

		player.on('phaseChanged', () => {
			this.setEnabled(false);
			player.handArea.setEnabled(false);
			player.equipArea.setEnabled(false);
		});

		this.emit('playerChanged', player);
	}

	getSelectedCards() {
		return this.selectedCards;
	}

	setSelectedCards(cards) {
		this.selectedCards = cards;
		this.emit('selectedCardsChanged', cards);
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
}

export default Dashboard;
