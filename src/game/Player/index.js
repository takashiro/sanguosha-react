
import EventEmitter from 'events';

import CardArea from '../CardArea';
import Kingdom from '../Kingdom';

class Player extends EventEmitter {

	constructor(uid, seat, name) {
		super();

		this._uid = uid;
		this._seat = seat;
		this._name = name;

		this._headGeneral = null;
		this._deputyGeneral = null;
		this._kingdom = 0;

		this._hp = 0;
		this._maxHp = 0;

		this.handArea = new CardArea(CardArea.Type.Hand);
		this.equipArea = new CardArea(CardArea.Type.Equip);
		this.delayedTrickArea = new CardArea(CardArea.Type.DelayedTrick);
		this.judgeArea = new CardArea(CardArea.Type.Judge);

		this._phase = 0;
	}

	uid() {
		return this._uid;
	}

	property(prop) {
		let getter = this[prop];
		if (getter) {
			return getter.call(this);
		}
	}

	setProperty(prop, value) {
		let setter = this['set' + prop.substr(0, 1).toUpperCase() + prop.substr(1)];
		if (setter) {
			return setter.call(this, value);
		}
	}

	seat() {
		return this._seat;
	}

	setSeat(seat) {
		this._seat = seat;
		this.emit('seatChanged', seat);
	}

	name() {
		return this._name;
	}

	setName(name) {
		this._name = name;
		this.emit('nameChanged', name);
	}

	general() {
		return this.headGeneral();
	}

	setGeneral(general) {
		this.setHeadGeneral(general);
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

	kingdom() {
		return this._kingdom;
	}

	setKingdom(kingdom) {
		if (typeof kingdom === 'number') {
			kingdom = Kingdom.fromNum(kingdom);
		}
		this._kingdom = kingdom;
		this.emit('kingdomChanged', kingdom);
	}

	hp() {
		return this._hp;
	}

	setHp(hp) {
		this._hp = hp;
		this.emit('hpChanged', hp);
	}

	maxHp() {
		return this._maxHp;
	}

	setMaxHp(maxHp) {
		this._maxHp = maxHp;
		this.emit('maxHpChanged', maxHp);
	}

	phase() {
		return this._phase;
	}

	setPhase(phase) {
		this._phase = phase;
		this.emit('phaseChanged', phase);
	}

}

export default Player;
