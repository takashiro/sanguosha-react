import { Command } from '@karuta/sanguosha-core';

import Room from '../Room';
import ActionConnector from '../ActionConnector';
import AreaLocator from '../AreaLocator';

interface Options {
	area: AreaLocator;
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

		const cards = area.getCards();
		const selectableCards = cards.map((card) => card.getId());
		area.setSelectableCards(selectableCards);
		area.setEnabled(true);

		const dashboard = room.getDashboard();
		dashboard.setCancelEnabled(true);

		const onSelectedCardsChanged = (cards: number[]): void => {
			const acceptable = cards.length === options.num;
			dashboard.setConfirmEnabled(acceptable);
		};
		area.on('selectedCardsChanged', onSelectedCardsChanged);

		dashboard.setConfirmListener(() => {
			area.off('selectedCardsChanged', onSelectedCardsChanged);

			const cards = area.getSelectedCards();
			area.setSelectedCards([]);
			client.reply(locker, cards);
		});

		client.once('lockChanged', () => {
			area.off('selectedCardsChanged', onSelectedCardsChanged);
		});
	}
}
