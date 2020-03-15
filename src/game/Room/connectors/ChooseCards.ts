import { Command } from '@karuta/sanguosha-core';

import Room from '../Room';
import ActionConnector from '../ActionConnector';
import AreaLocator from '../AreaLocator';
import Card from '../../Card';

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

		area.setSelectableCards(area.cards.map((card) => card.getId()));
		area.setEnabled(true);

		const dashboard = room.getDashboard();
		dashboard.setCancelEnabled(true);

		const onSelectedCardsChanged = (cards: Card[]): void => {
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
