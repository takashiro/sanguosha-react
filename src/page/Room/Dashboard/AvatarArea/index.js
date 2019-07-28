
import React from 'react';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';

class AvatarArea extends React.Component {

	constructor(props) {
		super(props);

		const player = props.player;
		this.state = {
			generalNum: 1,
			kingdom: 'unknown',
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
				kingdom={this.state.kingdom}
				general={this.state.headGeneral}
			/>
			{this.state.generalNum > 1 ? <GeneralAvatar
				position="deputy"
				kingdom={this.state.kingdom}
				general={this.state.deputyGeneral}
			/> : null}
		</div>;
	}

}

export default AvatarArea;
