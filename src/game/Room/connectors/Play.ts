import { Command } from '@karuta/sanguosha-core';
import ActionConnector from '../ActionConnector';

import Room from '../Room';

interface PlayOptions {
	cards: number[];
}

// @TO-DO: extract available skills
export default class Play extends ActionConnector<PlayOptions> {
	constructor() {
		super(Command.Play);
	}

	proceed(room: Room, options: PlayOptions): void {
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
			handArea.off('selectedCardsChanged', onSelectedCardsChanged);
			client.reply(locker, { cards });
		};
		handArea.once('selectedCardsChanged', onSelectedCardsChanged);

		client.once('lockChanged', () => {
			handArea.off('selectedCardsChanged', onSelectedCardsChanged);
		});

		dashboard.setFinishListener(() => {
			handArea.off('selectedCardsChanged', onSelectedCardsChanged);
			dashboard.setFinishEnabled(false);
			client.reply(locker, null);
		});

		dashboard.setFinishEnabled(true);
		handArea.setSelectableCards(options.cards);
		handArea.setEnabled(true);
	}
}
