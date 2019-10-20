
import React from 'react';

import HpBar from '../../component/HpBar';

import './index.scss';

class HpArea extends React.Component {
	constructor(props) {
		super(props);

		const { player } = this.props;
		this.state = {
			hp: player.hp(),
			maxHp: player.maxHp(),
		};
		player.on('hpChanged', (hp) => this.setState({ hp }));
		player.on('maxHpChanged', (maxHp) => this.setState({ maxHp }));
	}

	render() {
		const { hp, maxHp } = this.state;
		return (
			<div className="hp-area">
				<HpBar
					size="24"
					maxHp={maxHp}
					hp={hp}
				/>
			</div>
		);
	}
}

export default HpArea;
