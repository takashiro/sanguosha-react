import { Command } from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';
import Room from '../Room';
import ConfirmOption from '../Dashboard/ConfirmOption';
import CancelOption from '../Dashboard/CancelOption';
import FinishOption from '../Dashboard/FinishOption';

interface PlayOptions {
	cards: number[];
}

// @TO-DO: extract available skills
export default class Play extends ActionConnector<PlayOptions> {
	constructor() {
		super(Command.Play);
	}

	process(room: Room, options: PlayOptions): void {
		const client = room.getClient();
		const locker = client.lock();

		const dashboard = room.getDashboard();
		const player = dashboard.getPlayer();
		if (!player) {
			return;
		}

		const handArea = player.getHandArea();

		handArea.setSelectedCards([]);
		const onSelectedCardsChanged = (cards: number[]): void => {
			handArea.setSelectableCards(cards);
			client.reply(locker, { cards });
		};
		handArea.once('selectedCardsChanged', onSelectedCardsChanged);

		client.once('lockChanged', () => {
			handArea.off('selectedCardsChanged', onSelectedCardsChanged);
		});

		const confirm = new ConfirmOption(false);
		const cancel = new CancelOption(false);
		const finish = new FinishOption(true);
		dashboard.showOptions([
			confirm,
			cancel,
			finish,
		]);

		finish.once('clicked', () => {
			handArea.off('selectedCardsChanged', onSelectedCardsChanged);
			client.reply(locker, null);
		});

		handArea.setSelectableCards(options.cards);
		handArea.setEnabled(true);
	}
}
