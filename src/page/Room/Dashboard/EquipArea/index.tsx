
import React from 'react';

import './index.scss';

interface EquipState {
	type: string;
}

interface State {
	equips: EquipState[];
}

class EquipArea extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);

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

	render(): JSX.Element {
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
