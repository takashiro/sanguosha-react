
import EventEmitter from 'events';

import Kingdom from '../Kingdom';

class Player extends EventEmitter {
	constructor(uid, seat, name) {
		super();

		this.uid = uid;
		this.seat = seat;
		this.name = name;

		this.headGeneral = null;
		this.deputyGeneral = null;
		this.kingdom = 0;

		this.hp = 0;
		this.maxHp = 0;

		this.phase = 0;
	}

	getUid() {
		return this.uid;
	}

	property(prop) {
		const getter = this[prop];
		if (getter) {
			return getter.call(this);
		}

		return null;
	}

	setProperty(prop, value) {
		const setter = this[`set${prop.substr(0, 1).toUpperCase()}${prop.substr(1)}`];
		if (setter) {
			setter.call(this, value);
		}
	}

	getSeat() {
		return this.seat;
	}

	setSeat(seat) {
		this.seat = seat;
		this.emit('seatChanged', seat);
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
		this.emit('nameChanged', name);
	}

	getGeneral() {
		return this.getHeadGeneral();
	}

	setGeneral(general) {
		this.setHeadGeneral(general);
	}

	getHeadGeneral() {
		return this.headGeneral;
	}

	setHeadGeneral(general) {
		this.headGeneral = general;
		this.emit('headGeneralChanged', general);
	}

	getDeputyGeneral() {
		return this.deputyGeneral;
	}

	setDeputyGeneral(general) {
		this.deputyGeneral = general;
		this.emit('deputyGeneralChanged', general);
	}

	getKingdom() {
		return this.kingdom;
	}

	setKingdom(kingdom) {
		if (typeof kingdom === 'number') {
			kingdom = Kingdom.fromNum(kingdom);
		}
		this.kingdom = kingdom;
		this.emit('kingdomChanged', kingdom);
	}

	getHp() {
		return this.hp;
	}

	setHp(hp) {
		this.hp = hp;
		this.emit('hpChanged', hp);
	}

	getMaxHp() {
		return this.maxHp;
	}

	setMaxHp(maxHp) {
		this.maxHp = maxHp;
		this.emit('maxHpChanged', maxHp);
	}

	getPhase() {
		return this.phase;
	}

	setPhase(phase) {
		this.phase = phase;
		this.emit('phaseChanged', phase);
	}
}

export default Player;
