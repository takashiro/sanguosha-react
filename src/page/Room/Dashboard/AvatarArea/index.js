
import React from 'react';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';

class AvatarArea extends React.Component {
	constructor(props) {
		super(props);

		const { player } = props;
		this.state = {
			generalNum: 1,
			kingdom: 'unknown',
			headGeneral: player.getHeadGeneral(),
			deputyGeneral: player.getDeputyGeneral(),
		};

		player.on('headGeneralChanged', (general) => this.setState({ headGeneral: general }));
		player.on('deputyGeneralChanged', (general) => this.setState({ deputyGeneral: general }));
	}

	render() {
		const {
			kingdom,
			generalNum,
			headGeneral,
			deputyGeneral,
		} = this.state;
		return (
			<div className="avatar-area">
				<GeneralAvatar
					position="head"
					kingdom={kingdom}
					general={headGeneral}
				/>
				{generalNum > 1 ? (
					<GeneralAvatar
						position="deputy"
						kingdom={kingdom}
						general={deputyGeneral}
					/>
				) : null}
			</div>
		);
	}
}

export default AvatarArea;
