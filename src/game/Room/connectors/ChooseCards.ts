import {
	Command,
	CardOptionStruct,
} from '@karuta/sanguosha-core';

import Room from '../Room';
import ActionConnector from '../ActionConnector';
import CardArea from '../../CardArea';
import ConfirmOption from '../Dashboard/ConfirmOption';
import CancelOption from '../Dashboard/CancelOption';

export default class ChooseCards extends ActionConnector<CardOptionStruct> {
	constructor() {
		super(Command.ChooseCards);
	}

	process(room: Room, option: CardOptionStruct): void {
		if (!option || !option.areas || option.areas.length <= 0) {
			return;
		}

		const areas: CardArea[] = [];
		for (const locator of option.areas) {
			const area = room.findArea(locator);
			if (area) {
				areas.push(area);
			}
		}
		if (areas.length <= 0) {
			return;
		}

		const client = room.getClient();
		const locker = client.lock();

		if (option.cards) {
			const allowedCards = new Set(option.cards);
			for (const area of areas) {
				const selectableCards = area.getCards().map((card) => card.getId());
				area.setSelectableCards(selectableCards.filter((cardId) => allowedCards.has(cardId)));
				area.setEnabled(true);
			}
		} else {
			for (const area of areas) {
				const selectableCards = area.getCards().map((card) => card.getId());
				area.setSelectableCards(selectableCards);
				area.setEnabled(true);
			}
		}

		const dashboard = room.getDashboard();

		const confirm = new ConfirmOption(false);

		const onSelectedCardsChanged = (): void => {
			const selected: number[] = [];
			for (const area of areas) {
				selected.push(...area.getSelectedCards());
			}
			const acceptable = selected.length > 0 && option.minNum <= selected.length && selected.length <= option.maxNum;
			confirm.setEnabled(acceptable);
		};

		confirm.once('clicked', () => {
			const selected: number[] = [];
			for (const area of areas) {
				area.off('selectedCardsChanged', onSelectedCardsChanged);
				selected.push(...area.getSelectedCards());
			}
			client.reply(locker, selected);

			for (const area of areas) {
				area.setSelectedCards([]);
			}
			dashboard.resetSelection();
		});

		const cancel = new CancelOption(true);
		cancel.once('clicked', () => {
			client.reply(locker, []);
			dashboard.resetSelection();
		});

		dashboard.showOptions([confirm, cancel]);

		for (const area of areas) {
			area.on('selectedCardsChanged', onSelectedCardsChanged);
		}

		client.once('lockChanged', () => {
			for (const area of areas) {
				area.setEnabled(false);
			}
			dashboard.resetSelection();
		});
	}
}
