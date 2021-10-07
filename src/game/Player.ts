import { EventEmitter } from 'events';
import {
	GeneralProfile,
	PlayerPhase,
	CardAreaType,
	Kingdom,
	SkillAreaType,
} from '@karuta/sanguosha-core';

import CardArea from './CardArea';
import CardExpense from './CardExpense';
import CardUse from './CardUse';
import MotionPosition from './MotionPosition';
import SkillArea from './SkillArea';

declare interface Player {
	on(event: 'seatChanged', listener: (seat: number) => void): this;
	on(event: 'headGeneralChanged', listener: (general: GeneralProfile) => void): this;
	on(event: 'deputyGeneralChanged', listener: (general: GeneralProfile) => void): this;
	on(event: 'nameChanged', listener: (name: string) => void): this;
	on(event: 'kingdomChanged', listener: (kingdom: Kingdom) => void): this;
	on(event: 'selectableChanged', listener: (selectable: boolean) => void): this;
	on(event: 'selectedChanged', listener: (selected: boolean) => void): this;
	on(event: 'hpChanged', listener: (hp: number) => void): this;
	on(event: 'maxHpChanged', listener: (maxHp: number) => void): this;
	on(event: 'phaseChanged', listener: (phase: PlayerPhase) => void): this;
	on(event: 'positionRequested', listener: (pos: MotionPosition) => void): this;
	on(event: 'cardUsed', listener: (use: CardUse) => void): this;
	on(event: 'cardExpended', listener: (expense: CardExpense) => void): this;

	off(event: 'seatChanged', listener: (seat: number) => void): this;
	off(event: 'headGeneralChanged', listener: (general: GeneralProfile) => void): this;
	off(event: 'deputyGeneralChanged', listener: (general: GeneralProfile) => void): this;
	off(event: 'nameChanged', listener: (name: string) => void): this;
	off(event: 'kingdomChanged', listener: (kingdom: Kingdom) => void): this;
	off(event: 'selectableChanged', listener: (selectable: boolean) => void): this;
	off(event: 'selectedChanged', listener: (selected: boolean) => void): this;
	off(event: 'hpChanged', listener: (hp: number) => void): this;
	off(event: 'maxHpChanged', listener: (maxHp: number) => void): this;
	off(event: 'phaseChanged', listener: (phase: PlayerPhase) => void): this;
	off(event: 'positionRequested', listener: (pos: MotionPosition) => void): this;
	off(event: 'cardUsed', listener: (use: CardUse) => void): this;
	off(event: 'cardExpended', listener: (expense: CardExpense) => void): this;
}

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

	protected headSkillArea: SkillArea;

	protected deputySkillArea: SkillArea;

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

		this.equipArea = new CardArea(CardAreaType.Equip, seat);
		this.judgeArea = new CardArea(CardAreaType.Judge, seat);
		this.processArea = new CardArea(CardAreaType.Process, seat);

		this.headSkillArea = new SkillArea(SkillAreaType.Head);
		this.deputySkillArea = new SkillArea(SkillAreaType.Deputy);
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

	getCardAreas(): CardArea[] {
		return [
			this.getHandArea(),
			this.getEquipArea(),
			this.getJudgeArea(),
		];
	}

	getSkillArea(): SkillArea {
		return this.headSkillArea;
	}

	getHeadSkillArea(): SkillArea {
		return this.headSkillArea;
	}

	getDeputySkillArea(): SkillArea {
		return this.deputySkillArea;
	}

	findSkillArea(type: SkillAreaType): SkillArea {
		switch (type) {
		case SkillAreaType.Head:
			return this.getHeadSkillArea();
		case SkillAreaType.Deputy:
			return this.getDeputySkillArea();
		case SkillAreaType.HeadAcquired:
			return this.getHeadSkillArea();
		case SkillAreaType.DeputyAcquired:
			return this.getDeputySkillArea();
		default:
			return this.getHeadSkillArea();
		}
	}

	setProperty(prop: string, value: unknown): void {
		const setter = Reflect.get(this, `set${prop.charAt(0).toUpperCase()}${prop.substring(1)}`);
		if (setter) {
			Reflect.apply(setter, this, [value]);
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

	getPosition(): MotionPosition {
		const pos = {
			top: 0,
			left: 0,
		};
		this.emit('positionRequested', pos);
		return pos;
	}

	useCard(use: CardUse): void {
		this.emit('cardUsed', use);
	}

	expendCard(expense: CardExpense): void {
		this.emit('cardExpended', expense);
	}
}

export default Player;
