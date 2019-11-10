
export default function ChooseCards(options) {
	if (!options || !options.area) {
		return;
	}

	const area = this.findArea(options.area);
	if (!area) {
		return;
	}

	const { client } = this;
	const locker = client.lock();

	area.setSelectableCards(area.cards.map((card) => card.getId()));
	area.setEnabled(true);

	const { dashboard } = this;
	dashboard.setCancelEnabled(true);

	const onSelectedCardsChanged = (cards) => {
		const acceptable = cards.length === options.num;
		dashboard.setConfirmEnabled(acceptable);
	};
	area.on('selectedCardsChanged', onSelectedCardsChanged);

	const onConfirmClicked = () => {
		area.off('selectedCardsChanged', onSelectedCardsChanged);

		const cards = area.getSelectedCards();
		area.setSelectedCards([]);
		client.reply(locker, cards);
	};
	dashboard.once('confirm', onConfirmClicked);

	client.once('lockChanged', () => {
		area.off('selectedCardsChanged', onSelectedCardsChanged);
		dashboard.off('confirm', onConfirmClicked);
	});
}
