
import EventEmitter from 'events';

class Player extends EventEmitter {

	constructor(uid, seat, name) {
		super();

		this._uid = uid;
		this._seat = seat;
		this._name = name;
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

}

export default Player;
