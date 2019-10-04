import EventEmitter from 'events';

class Dashboard extends EventEmitter {

	constructor(uid) {
		super();

		this._uid = uid;
		this._player = null;
		this._selectedCards = [];
		this._enabled = false;
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
	}

	isEnabled() {
		return this._enabled;
	}

	setEnabled(enabled) {
		this._enabled = enabled;
		this.emit('enabledChanged', enabled);
	}

}

export default Dashboard;
