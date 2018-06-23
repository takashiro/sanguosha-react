
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import HpBar from '../../component/HpBar';
import PhotoAvatar from './Avatar';

class Photo extends React.Component {

	constructor(props) {
		super(props);

		const player = this.props.player;

		this.state = {
			seat: player.seat,
			headGeneral: props.headGeneral,
			deputyGeneral: props.deputyGeneral,
			screenName: player.name,
			hp: props.hp,
			maxHp: props.maxHp,
			kingdom: props.kingdom,
		};
	}

	render() {
		return <div className="photo">
			<div className="avatar-area">
				<PhotoAvatar position="head" general={this.state.headGeneral} />
				<PhotoAvatar position="deputy" general={this.state.deputyGeneral} />
			</div>
			<div className="frame"></div>
			<div className="screen-name">{this.state.screenName}</div>
			<KingdomIcon kingdom={this.state.kingdom} />
			<div className={'handcard-num ' + this.state.kingdom}>0</div>
			<HpBar size={18} hp={this.state.hp} maxHp={this.state.maxHp} />
		</div>;
	}

}

export default Photo;
