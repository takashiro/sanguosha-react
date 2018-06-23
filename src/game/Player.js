
import EventEmitter from 'events';

class Player extends EventEmitter {

	constructor(uid, seat, name) {
		super();

		this._uid = uid;
		this._seat = seat;
		this._name = name;

		this._headGeneral = null;
		this._deputyGeneral = null;
	}

	uid() {
		return this._uid;
	}

	seat() {
		return this._seat;
	}

	name() {
		return this._name;
	}

	headGeneral() {
		return this._headGeneral;
	}

	setHeadGeneral(general) {
		this._headGeneral = general;
		this.emit('headGeneralChanged', general);
	}

	deputyGeneral() {
		return this._deputyGeneral;
	}

	setDeputyGeneral(general) {
		this._deputyGeneral = general;
		this.emit('deputyGeneralChanged', general);
	}

}

export default Player;
