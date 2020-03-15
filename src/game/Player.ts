
import { EventEmitter } from 'events';
import {
	GeneralProfile,
	PlayerPhase,
	CardAreaType,
	Kingdom,
} from '@karuta/sanguosha-core';

import CardArea from './CardArea';

abstract class Player extends EventEmitter {
	protected uid: number;

	protected seat: number;

	protected name: string;

	protected selectable: boolean;

	protected selected: boolean;

	protected headGeneral: GeneralProfile | null;

	protected deputyGeneral: GeneralProfile | null;

	protected kingdom: Kingdom;

	protected hp: number;

	protected maxHp: number;

	protected phase: PlayerPhase;

	protected equipArea: CardArea;

	protected judgeArea: CardArea;

	protected processArea: CardArea;

	constructor(uid: number, seat: number, name: string) {
		super();

		this.uid = uid;
		this.seat = seat;
		this.name = name;

		this.selectable = false;
		this.selected = false;

		this.headGeneral = null;
		this.deputyGeneral = null;
		this.kingdom = Kingdom.Unknown;

		this.hp = 0;
		this.maxHp = 0;

		this.phase = 0;

		this.equipArea = new CardArea(CardAreaType.Equip);
		this.judgeArea = new CardArea(CardAreaType.Judge);
		this.processArea = new CardArea(CardAreaType.Process);
	}

	getUid(): number {
		return this.uid;
	}

	abstract getHandArea(): CardArea;

	getEquipArea(): CardArea {
		return this.equipArea;
	}

	getJudgeArea(): CardArea {
		return this.judgeArea;
	}

	getProcessArea(): CardArea {
		return this.processArea;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setProperty(prop: string, value: any): void {
		switch (prop) {
		case 'selectable': this.setSelectable(value); break;
		case 'selected': this.setSelected(value); break;
		case 'phase': this.setPhase(value); break;
		case 'hp': this.setHp(value); break;
		case 'maxHp': this.setMaxHp(value); break;
		case 'seat': this.setSeat(value); break;
		case 'name': this.setName(value); break;
		case 'general': this.setGeneral(value); break;
		case 'headGeneral': this.setHeadGeneral(value); break;
		case 'deputyGeneral': this.setDeputyGeneral(value); break;
		case 'kingdom': this.setKingdom(value); break;
		default: break;
		}
	}

	getSeat(): number {
		return this.seat;
	}

	setSeat(seat: number): void {
		this.seat = seat;
		this.emit('seatChanged', seat);
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
		this.emit('nameChanged', name);
	}

	isSelectable(): boolean {
		return this.selectable;
	}

	setSelectable(selectable: boolean): void {
		if (this.selectable === selectable) {
			return;
		}
		this.selectable = selectable;
		this.emit('selectableChanged', selectable);
	}

	isSelected(): boolean {
		return this.selected;
	}

	setSelected(selected: boolean): void {
		if (this.selected === selected) {
			return;
		}
		this.selected = selected;
		this.emit('selectedChanged', selected);
	}

	getGeneral(): GeneralProfile | null {
		return this.getHeadGeneral();
	}

	setGeneral(general: GeneralProfile | null): void {
		this.setHeadGeneral(general);
	}

	getHeadGeneral(): GeneralProfile | null {
		return this.headGeneral;
	}

	setHeadGeneral(general: GeneralProfile | null): void {
		this.headGeneral = general;
		this.emit('headGeneralChanged', general);
	}

	getDeputyGeneral(): GeneralProfile | null {
		return this.deputyGeneral;
	}

	setDeputyGeneral(general: GeneralProfile | null): void {
		this.deputyGeneral = general;
		this.emit('deputyGeneralChanged', general);
	}

	getKingdom(): Kingdom {
		return this.kingdom;
	}

	setKingdom(kingdom: Kingdom): void {
		this.kingdom = kingdom;
		this.emit('kingdomChanged', kingdom);
	}

	getHp(): number {
		return this.hp;
	}

	setHp(hp: number): void {
		this.hp = hp;
		this.emit('hpChanged', hp);
	}

	getMaxHp(): number {
		return this.maxHp;
	}

	setMaxHp(maxHp: number): void {
		this.maxHp = maxHp;
		this.emit('maxHpChanged', maxHp);
	}

	getPhase(): PlayerPhase {
		return this.phase;
	}

	setPhase(phase: PlayerPhase): void {
		this.phase = phase;
		this.emit('phaseChanged', phase);
	}
}

export default Player;
