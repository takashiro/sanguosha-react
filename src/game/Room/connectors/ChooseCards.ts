import {
	Command,
	CardAreaLocator,
} from '@karuta/sanguosha-core';

import Room from '../Room';
import ActionConnector from '../ActionConnector';

interface Options {
	area: CardAreaLocator;
	cards: number[];
	num: number;
}

export default class ChooseCards extends ActionConnector<Options> {
	constructor() {
		super(Command.ChooseCards);
	}

	proceed(room: Room, options: Options): void {
		if (!options || !options.area) {
			return;
		}

		const area = room.findArea(options.area);
		if (!area) {
			return;
		}

		const client = room.getClient();
		const locker = client.lock();

		const selectableCards = options.cards || area.getCards().map((card) => card.getId());
		area.setSelectableCards(selectableCards);
		area.setEnabled(true);

		const dashboard = room.getDashboard();
		dashboard.setCancelListener(() => {
			client.reply(locker, []);
			dashboard.resetSelection();
		});
		dashboard.setCancelEnabled(true);

		const onSelectedCardsChanged = (selected: number[]): void => {
			const acceptable = selected.length === options.num;
			dashboard.setConfirmEnabled(acceptable);
		};
		area.on('selectedCardsChanged', onSelectedCardsChanged);

		dashboard.setConfirmListener(() => {
			area.off('selectedCardsChanged', onSelectedCardsChanged);

			const selected = area.getSelectedCards();
			area.setSelectedCards([]);
			client.reply(locker, selected);
			dashboard.resetSelection();
		});

		client.once('lockChanged', () => {
			area.off('selectedCardsChanged', onSelectedCardsChanged);
		});
	}
}
