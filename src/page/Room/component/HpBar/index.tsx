import React from 'react';

import Player from '../../../../game/Player';

import './index.scss';

interface Props {
	player: Player;
	size: number;
}

interface State {
	hp: number;
	maxHp: number;
}

class HpBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const { player } = props;

		this.state = {
			maxHp: player.getMaxHp(),
			hp: player.getHp(),
		};
	}

	componentDidMount(): void {
		const { player } = this.props;
		player.on('hpChanged', this.onHpChanged);
		player.on('maxHpChanged', this.onMaxHpChanged);
	}

	componentWillUnmount(): void {
		const { player } = this.props;
		player.off('hpChanged', this.onHpChanged);
		player.off('maxHpChanged', this.onMaxHpChanged);
	}

	onHpChanged = (hp: number): void => this.setState({ hp });

	onMaxHpChanged = (maxHp: number): void => this.setState({ maxHp });

	getLevel(): string {
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

	render(): JSX.Element {
		const { size } = this.props;
		const { hp, maxHp } = this.state;
		const className = `hp-bar ${this.getLevel()}`;

		const magatamaNum = Math.max(0, hp);
		const magatama = new Array(magatamaNum);
		for (let i = 0; i < magatamaNum; i++) {
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
