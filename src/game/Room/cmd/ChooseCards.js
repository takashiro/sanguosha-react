import cmd from '../../../protocol';

export default function ChooseCards(options) {
	if (!options || !options.area) {
		return;
	}

	const area = this.findArea(options.area);
	if (!area) {
		return;
	}

	area.setEnabled(true);

	const { dashboard } = this;
	dashboard.setCancelEnabled(true);

	const onSelectedCardsChanged = cards => {
		const acceptable = cards.length === options.num;
		dashboard.setConfirmEnabled(acceptable);
	};
	dashboard.on('selectedCardsChanged', onSelectedCardsChanged);

	const onConfirmClicked = () => {
		const cards = dashboard.selectedCards();
		dashboard.setSelectedCards([]);
		const ids = cards.map(card => card.id());
		this.reply(cmd.ChooseCards, ids);
	};
	dashboard.once('confirm', onConfirmClicked);
}
