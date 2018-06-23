
import React from 'react';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';
import HpBar from '../../component/HpBar';

class AvatarArea extends React.Component {

	constructor(props) {
		super(props);

		const player = props.player;
		this.state ={
			headGeneral: player.headGeneral(),
			deputyGeneral: player.deputyGeneral(),
		};

		player.on('headGeneralChanged', general => this.setState({headGeneral: general}));
		player.on('deputyGeneralChanged', general => this.setState({deputyGeneral: general}));
	}

	render() {


		return <div className="avatar-area">
			<GeneralAvatar
				position="head"
				general={this.state.headGeneral}
			/>
			<GeneralAvatar
				position="deputy"
				genreal={this.state.deputyGeneral}
			/>
			<div className="hp-bar-wrapper">
				<HpBar
					size="24"
					maxHp="4"
					hp="3"
				/>
			</div>
		</div>;
	}

}

export default AvatarArea;
