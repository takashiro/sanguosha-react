
import React from 'react';

import './index.scss';

class EquipArea extends React.Component {
	constructor() {
		super();

		this.state = {
			equips: [
				{
					type: 'weapon',
				},
				{
					type: 'armor',
				},
				{
					type: 'offensiveHorse',
				},
				{
					type: 'defensiveHorse',
				},
				{
					type: 'treasure',
				},
			],
		};
	}

	render() {
		const { equips } = this.state;
		return (
			<ul className="equip-area">
				{equips.map((equip) => (
					<li key={equip.type} />
				))}
			</ul>
		);
	}
}

export default EquipArea;
