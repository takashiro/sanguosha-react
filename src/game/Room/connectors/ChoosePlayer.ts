import { Command } from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';
import Player from '../../Player';
import ConfirmOption from '../Dashboard/ConfirmOption';
import CancelOption from '../Dashboard/CancelOption';
import FinishOption from '../Dashboard/FinishOption';

interface Options {
	feasible: boolean;
	candidates: number[];
}

export default class ChoosePlayer extends ActionConnector<Options> {
	constructor() {
		super(Command.ChoosePlayer);
	}

	process(room: Room, options: Options): void {
		const client = room.getClient();
		const locker = client.lock();

		const { feasible } = options;
		const dashboard = room.getDashboard();

		const onSelectedPlayerChanged = (player: Player): void => {
			const selected = player.isSelected();
			client.reply(locker, { player: player.getSeat(), selected });
		};
		room.once('selectedPlayerChanged', onSelectedPlayerChanged);

		const confirm = new ConfirmOption(false);
		confirm.once('clicked', () => {
			client.reply(locker, { confirm: true });

			room.off('selectedPlayerChanged', onSelectedPlayerChanged);
			room.resetSelection();
			dashboard.resetSelection();
		});
		confirm.setEnabled(feasible);

		const cancel = new CancelOption(true);
		cancel.once('clicked', () => {
			client.reply(locker, { cancel: true });

			room.off('selectedPlayerChanged', onSelectedPlayerChanged);
			room.resetSelection();
			dashboard.resetSelection();
		});

		const finish = new FinishOption(false);
		dashboard.showOptions([
			confirm,
			cancel,
			finish,
		]);

		const self = dashboard.getPlayer();
		const onCardUnselected = (cards: number[]): void => {
			if (cards.length <= 0) {
				cancel.click();
			}
		};
		if (self) {
			const handArea = self.getHandArea();
			handArea.once('selectedCardsChanged', onCardUnselected);
		}

		client.once('lockChanged', () => {
			room.off('selectedPlayerChanged', onSelectedPlayerChanged);
			if (self) {
				const handArea = self.getHandArea();
				handArea.off('selectedCardsChanged', onCardUnselected);
			}
		});

		const { candidates } = options;
		for (const player of room.getPlayers()) {
			const selectable = candidates.includes(player.getSeat());
			if (selectable) {
				player.setSelectable(true);
			} else if (!player.isSelected()) {
				player.setSelectable(false);
			}
		}
		room.setSelectable(true);
	}
}
