
import React from 'react';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';

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
				general={this.state.deputyGeneral}
			/>
		</div>;
	}

}

export default AvatarArea;
