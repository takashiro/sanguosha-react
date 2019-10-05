import EventEmitter from 'events';

class Dashboard extends EventEmitter {

	constructor(uid) {
		super();

		this._uid = uid;
		this._player = null;
		this._selectedCards = [];
		this._confirmEnabled = false;
		this._cancelEnabled = false;
		this._finishEnabled = false;
	}

	uid() {
		return this._uid;
	}

	player() {
		return this._player;
	}

	setPlayer(player) {
		this._player = player;

		player.on('phaseChanged', () => {
			this.setEnabled(false);
			player.handArea.setEnabled(false);
			player.equipArea.setEnabled(false);
		});

		this.emit('playerChanged', player);
	}

	selectedCards() {
		return this._selectedCards;
	}

	setSelectedCards(cards) {
		this._selectedCards = cards;
		this.emit('selectedCardsChanged', cards);
	}

	isConfirmEnabled() {
		return this._confirmEnabled;
	}

	setConfirmEnabled(enabled) {
		this._confirmEnabled = enabled;
		this.emit('confirmEnabledChanged', enabled);
	}

	isCancelEnabled() {
		return this._cancelEnabled;
	}

	setCancelEnabled(enabled) {
		this._cancelEnabled = enabled;
		this.emit('cancelEnabledChanged', enabled);
	}

	isFinishEnabled() {
		return this._finishEnabled;
	}

	setFinishEnabled(enabled) {
		this._finishEnabled = enabled;
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
