
import React from 'react';

import './index.scss';

class HpBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			maxHp: props.maxHp !== undefined ? props.maxHp : 4,
			hp: props.maxHp !== undefined ? props.hp : 3,
		};
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
