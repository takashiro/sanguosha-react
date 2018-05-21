
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import HpBar from '../../component/HpBar';

function copyGeneral(props) {
	return {
		avatar: props.avatar,
		name: props.name,
	};
}

function PhotoAvatar(props) {
	const general = props.general;
	const className = 'avatar ' + props.position;
	const avatar = `style/general/fullphoto/${general.avatar}.png`;
	return <div className={className}>
		<img src={avatar} />
		<div className="name">{general.name}</div>
	</div>;
}

class Photo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			headGeneral: copyGeneral(props.headGeneral),
			deputyGeneral: copyGeneral(props.deputyGeneral),
			screenName: props.screenName,
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
