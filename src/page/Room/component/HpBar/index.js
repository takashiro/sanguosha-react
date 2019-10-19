
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
		const className = `hp-bar ${this.getLevel()}`;

		const hp = new Array(this.state.hp);
		for (let i = 0; i < this.state.hp; i++) {
			hp[i] = (
				<div
					key={i}
					className="hp"
				/>
			);
		}

		const barStyle = {
			width: `${this.props.size}px`,
			height: `${this.props.size * this.state.maxHp}px`,
		};

		return (
			<div className={className} style={barStyle}>
				{hp}
			</div>
		);
	}
}

export default HpBar;
