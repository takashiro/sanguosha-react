export default function ChooseCards(options) {
	if (!options || !options.area) {
		return;
	}

	const area = this.findArea(options.area);
	if (!area) {
		return;
	}

	area.setEnabled(true);
}
