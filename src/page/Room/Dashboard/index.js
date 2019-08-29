
import React from 'react';

import './index.scss';

import EquipArea from './EquipArea';
import HandArea from './HandArea';
import ButtonArea from './ButtonArea';
import AvatarArea from './AvatarArea';
import HpArea from './HpArea';
import PhaseBar from '../component/PhaseBar';

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

		const room = this.props.room;
		this.state = {
			player: room.dashboardPlayer()
		};
		room.on('playerChanged', () => {
			this.setState({player: room.dashboardPlayer()});
		});
	}

	render() {
		const player = this.state.player;
		if (!player) {
			return null;
		}

		return <div className="dashboard">
			<PhaseBar player={player} />
			<EquipArea />
			<HandArea area={player.handArea} />
			<ButtonArea player={player} />
			<AvatarArea player={player} />
			<HpArea player={player} />
		</div>;
	}

}

export default Dashboard;
