import { EventEmitter } from 'events';

import CardArea from '../CardArea';

import Player from './DashboardPlayer';

type Listener = () => void;

class Dashboard extends EventEmitter {
	uid: number;

	player?: Player;

	confirmEnabled: boolean;

	confirmListener: Listener | null;

	cancelEnabled: boolean;

	cancelListener: Listener | null;

	finishEnabled: boolean;

	finishListener: Listener | null;

	constructor(uid: number) {
		super();

		this.uid = uid;

		this.confirmListener = null;
		this.confirmEnabled = false;
		this.cancelListener = null;
		this.cancelEnabled = false;
		this.finishEnabled = false;
		this.finishListener = null;
	}

	getUid(): number {
		return this.uid;
	}

	getPlayer(): Player | undefined {
		return this.player;
	}

	setPlayer(player: Player): void {
		this.player = player;
		this.emit('playerChanged', player);
	}

	getSelectedCards(): number[] {
		if (!this.player) {
			return [];
		}

		const areas: CardArea[] = [
			this.player.getHandArea(),
			this.player.getEquipArea(),
		];

		const cards: number[] = [];
		for (const area of areas) {
			cards.push(...area.getSelectedCards());
		}
		return cards;
	}

	isConfirmEnabled(): boolean {
		return this.confirmEnabled;
	}

	setConfirmEnabled(enabled: boolean): void {
		this.confirmEnabled = enabled;
		this.emit('confirmEnabledChanged', enabled);
	}

	isCancelEnabled(): boolean {
		return this.cancelEnabled;
	}

	setCancelEnabled(enabled: boolean): void {
		this.cancelEnabled = enabled;
		this.emit('cancelEnabledChanged', enabled);
	}

	isFinishEnabled(): boolean {
		return this.finishEnabled;
	}

	setFinishEnabled(enabled: boolean): void {
		this.finishEnabled = enabled;
		this.emit('finishEnabledChanged', enabled);
	}

	setEnabled(enabled: boolean): void {
		this.setConfirmEnabled(enabled);
		this.setCancelEnabled(enabled);
		this.setFinishEnabled(enabled);
	}

	setConfirmListener(listener: Listener): void {
		this.confirmListener = listener;
	}

	confirm(): void {
		if (this.isConfirmEnabled() && this.confirmListener) {
			this.confirmListener();
		}
	}

	setCancelListener(listener: Listener): void {
		this.cancelListener = listener;
	}

	cancel(): void {
		if (this.isCancelEnabled() && this.cancelListener) {
			this.cancelListener();
		}
	}

	setFinishListener(listener: Listener): void {
		this.finishListener = listener;
	}

	finish(): void {
		if (this.isFinishEnabled() && this.finishListener) {
			this.finishListener();
		}
	}

	/**
	 * Reset selectable cards, selected cards and disable all buttons.
	 */
	resetSelection(): void {
		this.setEnabled(false);
		this.confirmListener = null;
		this.cancelListener = null;
		this.finishListener = null;

		if (this.player) {
			const areas: CardArea[] = [
				this.player.getHandArea(),
				this.player.getEquipArea(),
			];

			for (const area of areas) {
				area.setEnabled(false);
				area.setSelectableCards([]);
				area.setSelectedCards([]);
			}
		}
	}
}

export default Dashboard;
