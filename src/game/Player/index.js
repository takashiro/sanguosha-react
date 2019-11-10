
import EventEmitter from 'events';

import Kingdom from '../Kingdom';

class Player extends EventEmitter {
	constructor(uid, seat, name) {
		super();

		this.uid = uid;
		this.seat = seat;
		this.name = name;

		this.selectable = false;
		this.selected = false;

		this.headGeneral = null;
		this.deputyGeneral = null;
		this.kingdom = 0;

		this.hp = 0;
		this.maxHp = 0;

		this.phase = 0;

		this.handArea = null;
		this.equipArea = null;
		this.judgeArea = null;
		this.processArea = null;
	}

	getUid() {
		return this.uid;
	}

	getHandArea() {
		return this.handArea;
	}

	setHandArea(area) {
		this.handArea = area;
	}

	getEquipArea() {
		return this.equipArea;
	}

	setEquipArea(area) {
		this.equipArea = area;
	}

	getJudgeArea() {
		return this.judgeArea;
	}

	setJudgeArea(area) {
		this.judgeArea = area;
	}

	getProcessArea() {
		return this.processArea;
	}

	setProcessArea(area) {
		this.processArea = area;
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

	isSelectable() {
		return this.selectable;
	}

	setSelectable(selectable) {
		this.selectable = selectable;
		this.emit('selectableChanged', selectable);
	}

	isSelected() {
		return this.selected;
	}

	setSelected(selected) {
		this.selected = selected;
		this.emit('selectedChanged', selected);
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
