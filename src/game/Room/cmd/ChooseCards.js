
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

	area.setEnabled(true);

	const { dashboard } = this;
	dashboard.setCancelEnabled(true);

	const onSelectedCardsChanged = (cards) => {
		const acceptable = cards.length === options.num;
		dashboard.setConfirmEnabled(acceptable);
	};
	dashboard.on('selectedCardsChanged', onSelectedCardsChanged);

	const onConfirmClicked = () => {
		dashboard.off('selectedCardsChanged', onSelectedCardsChanged);

		const cards = dashboard.selectedCards();
		dashboard.setSelectedCards([]);
		const ids = cards.map((card) => card.id());
		client.reply(locker, ids);
	};
	dashboard.once('confirm', onConfirmClicked);

	client.once('lockChanged', () => {
		dashboard.off('selectedCardsChanged', onSelectedCardsChanged);
		dashboard.off('confirm', onConfirmClicked);
	});
}
