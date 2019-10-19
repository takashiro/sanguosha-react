
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

		const { dashboard } = this.props;
		this.state = {
			player: dashboard.player(),
		};
		dashboard.on('playerChanged', () => {
			this.setState({ player: dashboard.player() });
		});
	}

	render() {
		const { player } = this.state;
		if (!player) {
			return null;
		}

		const { dashboard } = this.props;

		return (
			<div className="dashboard">
				<PhaseBar player={player} />
				<EquipArea />
				<HandArea
					area={player.handArea}
					onSelectionChanged={(cards) => dashboard.setSelectedCards(cards)}
				/>
				<ButtonArea dashboard={dashboard} />
				<AvatarArea player={player} />
				<HpArea player={player} />
			</div>
		);
	}
}

export default Dashboard;
