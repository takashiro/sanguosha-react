
import { EventEmitter } from 'events';

import Card from './Card';
import MotionPosition from './MotionPosition';
import MotionState from './MotionState';

let serial = 1;

const initialState: MotionState = {
	top: 0,
	left: 0,
	opacity: 0,
};

export default class MovableCard extends EventEmitter {
	protected serial: number;

	protected card: Card;

	protected startState: MotionState;

	protected endState: MotionState;

	protected selectable: boolean;

	protected selected: boolean;

	protected width: number;

	protected height: number;

	protected valid: boolean;

	/**
	 * A card move with start and end states
	 * @param {Card} card
	 */
	constructor(card: Card) {
		super();

		this.serial = serial++;
		this.card = card;
		this.selectable = false;
		this.selected = false;
		this.width = 93;
		this.height = 130;
		this.startState = initialState;
		this.endState = initialState;
		this.valid = true;
	}

	getId(): number {
		return this.card ? this.card.getId() : 0;
	}

	getSerial(): number {
		return this.serial;
	}

	getWidth(): number {
		return this.width;
	}

	getHeight(): number {
		return this.height;
	}

	isSelected(): boolean {
		return this.selected;
	}

	setSelected(selected: boolean): void {
		this.selected = selected;
		this.emit('selectedChanged', selected);
	}

	isSelectable(): boolean {
		return this.selectable;
	}

	setSelectable(selectable: boolean): void {
		this.selectable = selectable;
		this.emit('selectableChanged', selectable);
	}

	/**
	 * The start state
	 */
	getStartState(): MotionState {
		return this.startState;
	}

	/**
	 * Sets the start point
	 * @param state
	 */
	setStartState(state: MotionState): void {
		this.startState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * The end point
	 */
	getEndState(): MotionState {
		return this.endState;
	}

	/**
	 * Sets the end point
	 * @param state
	 */
	setEndState(state: MotionState): void {
		this.endState = {
			opacity: 1,
			...state,
		};
	}

	/**
	 * Move start state and end state by an offset
	 * @param offset
	 */
	moveBy(offset: MotionPosition): void {
		if (this.startState) {
			this.startState.top += offset.top;
			this.startState.left += offset.left;
		}
		if (this.endState) {
			this.endState.top += offset.top;
			this.endState.left += offset.left;
		}
	}

	/**
	 * Move the card into a new state
	 * @param {MotionPosition} state
	 */
	goTo(state: MotionPosition): void {
		if (!this.endState) {
			return;
		}

		this.startState = this.endState;
		this.endState = {
			...this.endState,
			...state,
		};

		this.emit('move');
	}

	/**
	 * @return the first card.
	 */
	instance(): Card {
		return this.card;
	}

	/**
	 * Check if it is the same card.
	 * @param card
	 */
	equals(card: MovableCard): boolean {
		return this.instance() === card.instance();
	}

	/**
	 * @return Check if the motion is still valid.
	 */
	isValid(): boolean {
		return this.valid;
	}

	/**
	 * Destroy the path to indicate animation is done.
	 */
	destroy(): void {
		this.valid = false;
		this.emit('destroyed');
	}
}
