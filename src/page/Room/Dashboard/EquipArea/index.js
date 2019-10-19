
import React from 'react';

import './index.scss';

class EquipArea extends React.Component {
	constructor() {
		super();

		this.state = {
			equips: [
				null,
				null,
				null,
				null,
				null,
			],
		};
	}

	render() {
		const equips = this.state.equips.map((value, i) => (
			<li key={i} />
		));

		return (
			<ul className="equip-area">
				{equips}
			</ul>
		);
	}
}

export default EquipArea;
