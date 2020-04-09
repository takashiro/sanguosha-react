
import React from 'react';

import EquipArea from './EquipArea';
import HandArea from './HandArea';
import ButtonArea from './ButtonArea';
import AvatarArea from './AvatarArea';
import HpArea from './HpArea';

import AnimationLayer from '../component/AnimationLayer';
import PhaseBar from '../component/PhaseBar';

import GameDashboard from '../../../game/Room/Dashboard';
import DashboardPlayer from '../../../game/Room/DashboardPlayer';
import MotionPosition from '../../../game/MotionPosition';

import './index.scss';

interface DashboardProps {
	dashboard: GameDashboard;
}

interface DashboardState {
	player?: DashboardPlayer;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: DashboardProps) {
		super(props);

		const { dashboard } = this.props;
		this.state = {
			player: dashboard.getPlayer(),
		};

		this.node = React.createRef();
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('playerChanged', this.onPlayerChange);

		const player = dashboard.getPlayer();
		if (player) {
			this.bindPlayer(player);
		}
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('playerChanged', this.onPlayerChange);

		const { player } = this.state;
		if (player) {
			this.unbindPlayer(player);
		}
	}

	onPlayerChange = (player: DashboardPlayer): void => {
		this.setState((prev) => {
			if (prev.player) {
				this.unbindPlayer(prev.player);
			}

			this.bindPlayer(player);
			return { player };
		});
	}

	onPositionRequested = (pos: MotionPosition): void => {
		const { current } = this.node;
		if (!current) {
			return;
		}

		const rect = current.getBoundingClientRect();
		pos.top = rect.top;
		pos.left = Math.floor((rect.left + rect.right) / 2);
	}

	bindPlayer(player: DashboardPlayer): void {
		player.on('positionRequested', this.onPositionRequested);
	}

	unbindPlayer(player: DashboardPlayer): void {
		player.off('positionRequested', this.onPositionRequested);
	}

	render(): JSX.Element | null {
		const { player } = this.state;
		if (!player) {
			return null;
		}

		const { dashboard } = this.props;

		return (
			<div className="dashboard" ref={this.node}>
				<PhaseBar player={player} />
				<EquipArea />
				<HandArea area={player.getHandArea()} />
				<ButtonArea dashboard={dashboard} />
				<AvatarArea player={player} />
				<HpArea player={player} />
				<AnimationLayer player={player} />
			</div>
		);
	}
}

export default Dashboard;
