
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

		const player = this.props.player;

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

		player.on('seatChanged', seat => this.setState({seat: seat}));
		player.on('headGeneralChanged', general => this.setState({headGeneral: general}));
		player.on('deputyGeneralChanged', general => this.setState({deputyGeneral: general}));
		player.on('nameChanged', name => this.setState({screenName: name}));
		player.on('hpChanged', hp => this.setState({hp: hp}));
		player.on('maxHpChanged', maxHp => this.setState({maxHp: maxHp}));
		player.on('kingdomChanged', kingdom => this.setState({kingdom: kingdom}));
	}

	render() {
		const player = this.props.player;

		return <div className={'photo' + ' ' + this.state.kingdom}>
			<div className={'avatar-area g' + this.state.generalNum}>
				<PhotoAvatar
					position="head"
					general={this.state.headGeneral}
				/>
				{this.state.generalNum > 1 ? <PhotoAvatar
					position="deputy"
					general={this.state.deputyGeneral}
				/> : null}
			</div>
			{this.state.generalNum === 2 ? <div className="frame"></div> : null}
			<div className="screen-name">{this.state.screenName}</div>
			<KingdomIcon kingdom={this.state.kingdom} />
			<HandArea area={player.handArea} />
			<HpBar size={18} hp={this.state.hp} maxHp={this.state.maxHp} />
			<SeatNumber number={this.state.seat} />
			<PhaseBar player={player} />
		</div>;
	}

}

export default Photo;
