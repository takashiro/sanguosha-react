import React from 'react';
import { Kingdom } from '@karuta/sanguosha-core';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';

import Dashboard from '../../../../game/Room/Dashboard';
import Player from '../../../../game/Player';

interface AreaProps {
	dashboard: Dashboard;
}

interface AreaState {
	kingdom: Kingdom;
	seat: number;
}

class DecorativeArea extends React.Component<AreaProps, AreaState> {
	constructor(props: AreaProps) {
		super(props);

		const { dashboard } = this.props;
		const player = dashboard.getPlayer();

		this.state = {
			kingdom: player ? player.getKingdom() : Kingdom.Unknown,
			seat: player ? player.getSeat() : 0,
		};
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('playerChanged', this.onPlayerChanged);

		const player = dashboard.getPlayer();
		if (player) {
			player.on('kingdomChanged', this.onPlayerKingdomChanged);
			player.on('seatChanged', this.onPlayerSeatChanged);
		}
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('playerChanged', this.onPlayerChanged);

		const player = dashboard.getPlayer();
		if (player) {
			player.off('kingdomChanged', this.onPlayerKingdomChanged);
			player.off('seatChanged', this.onPlayerSeatChanged);
		}
	}

	onPlayerChanged = (player: Player): void => {
		this.setState({ kingdom: player.getKingdom() });
	}

	onPlayerKingdomChanged = (kingdom: Kingdom): void => {
		this.setState({ kingdom });
	}

	onPlayerSeatChanged = (seat: number): void => {
		this.setState({ seat });
	}

	render(): JSX.Element {
		const {
			kingdom,
			seat,
		} = this.state;

		return (
			<div className="decorative-area">
				<KingdomIcon kingdom={kingdom} />
				<SeatNumber number={seat} />
			</div>
		);
	}
}

export default DecorativeArea;
