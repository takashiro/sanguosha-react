
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import HpBar from '../../component/HpBar';
import PhotoAvatar from './Avatar';
import HandArea from './HandArea';
import SeatNumber from './SeatNumber';
import PhaseBar from '../../component/PhaseBar';

class Photo extends React.Component {
	constructor(props) {
		super(props);

		const { player } = this.props;

		this.state = {
			generalNum: 1,
			seat: player.seat(),
			headGeneral: player.headGeneral(),
			deputyGeneral: player.deputyGeneral(),
			screenName: player.name(),
			hp: player.hp(),
			maxHp: player.maxHp(),
			kingdom: player.kingdom(),
		};

		player.on('seatChanged', (seat) => this.setState({ seat }));
		player.on('headGeneralChanged', (general) => this.setState({ headGeneral: general }));
		player.on('deputyGeneralChanged', (general) => this.setState({ deputyGeneral: general }));
		player.on('nameChanged', (name) => this.setState({ screenName: name }));
		player.on('hpChanged', (hp) => this.setState({ hp }));
		player.on('maxHpChanged', (maxHp) => this.setState({ maxHp }));
		player.on('kingdomChanged', (kingdom) => this.setState({ kingdom }));
	}

	render() {
		const { player } = this.props;
		const { kingdom } = this.state;
		const { generalNum } = this.state;
		const { headGeneral } = this.state;
		const { deputyGeneral } = this.state;
		const { screenName } = this.state;
		const { hp, maxHp } = this.state;
		const { seat } = this.state;

		return (
			<div className={`photo ${kingdom ? kingdom.toLowerCase() : 'unknown'}`}>
				<div className={`avatar-area g${generalNum}`}>
					<PhotoAvatar
						position="head"
						general={headGeneral}
					/>
					{generalNum > 1 ? (
						<PhotoAvatar
							position="deputy"
							general={deputyGeneral}
						/>
					) : null}
				</div>
				{generalNum === 2 ? <div className="frame" /> : null}
				<div className="screen-name">{screenName}</div>
				<KingdomIcon kingdom={kingdom} />
				<HpBar size={18} hp={hp} maxHp={maxHp} />
				<SeatNumber number={seat} />
				<PhaseBar player={player} />
				<HandArea area={player.handArea} />
			</div>
		);
	}
}

export default Photo;
