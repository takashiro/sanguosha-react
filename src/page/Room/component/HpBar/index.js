
import React from 'react';

import './index.scss';

class HpBar extends React.Component {
	constructor(props) {
		super(props);

		const { player } = props;

		this.state = {
			maxHp: player.getMaxHp(),
			hp: player.getHp(),
		};

		this.onHpChanged = (hp) => this.setState({ hp });
		this.onMaxHpChanged = (maxHp) => this.setState({ maxHp });
	}

	componentDidMount() {
		const { player } = this.props;
		player.on('hpChanged', this.onHpChanged);
		player.on('maxHpChanged', this.onMaxHpChanged);
	}

	componentWillUnmount() {
		const { player } = this.props;
		player.off('hpChanged', this.onHpChanged);
		player.off('maxHpChanged', this.onMaxHpChanged);
	}

	getLevel() {
		const { hp } = this.state;
		const { maxHp } = this.state;
		switch (maxHp) {
		case 2:
			if (hp < 2) {
				return 'low';
			}
			break;
		case 3:
			if (hp < 2) {
				return 'low';
			}
			if (hp < 3) {
				return 'medium';
			}
			break;
		default:
			if (hp <= maxHp / 3) {
				return 'low';
			}
			if (hp <= maxHp / 2) {
				return 'medium';
			}
		}
		return '';
	}

	render() {
		const { size } = this.props;
		const { hp, maxHp } = this.state;
		const className = `hp-bar ${this.getLevel()}`;

		const magatama = new Array(hp);
		for (let i = 0; i < hp; i++) {
			magatama[i] = (
				<div
					key={i}
					className="hp"
				/>
			);
		}

		const barStyle = {
			width: `${size}px`,
			height: `${size * maxHp}px`,
		};

		return (
			<div className={className} style={barStyle}>
				{magatama}
			</div>
		);
	}
}

export default HpBar;
