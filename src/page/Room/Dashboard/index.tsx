
import React from 'react';

import EquipArea from './EquipArea';
import HandArea from './HandArea';
import ButtonArea from './ButtonArea';
import AvatarArea from './AvatarArea';
import HpArea from './HpArea';
import PhaseBar from '../component/PhaseBar';

import GameDashboard from '../../../game/Room/Dashboard';
import DashboardPlayer from '../../../game/Room/DashboardPlayer';

import './index.scss';

interface DashboardProps {
	dashboard: GameDashboard;
}

interface DashboardState {
	player?: DashboardPlayer;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		const { dashboard } = this.props;
		this.state = {
			player: dashboard.getPlayer(),
		};
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('playerChanged', this.onPlayerChange);
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('playerChanged', this.onPlayerChange);
	}

	onPlayerChange = (player: DashboardPlayer): void => {
		this.setState({ player });
	}

	render(): JSX.Element | null {
		const { player } = this.state;
		if (!player) {
			return null;
		}

		const { dashboard } = this.props;

		return (
			<div className="dashboard">
				<PhaseBar player={player} />
				<EquipArea />
				<HandArea area={player.getHandArea()} />
				<ButtonArea dashboard={dashboard} />
				<AvatarArea player={player} />
				<HpArea player={player} />
			</div>
		);
	}
}

export default Dashboard;
