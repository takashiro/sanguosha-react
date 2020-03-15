
import React from 'react';
import { GeneralProfile } from '@karuta/sanguosha-core';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';

import Player from '../../../../game/Player';

interface Props {
	player: Player;
}

interface State {
	headGeneral: GeneralProfile | null;
	deputyGeneral: GeneralProfile | null;
}

class AvatarArea extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const { player } = props;
		this.state = {
			headGeneral: player.getHeadGeneral(),
			deputyGeneral: player.getDeputyGeneral(),
		};
	}

	componentDidMount(): void {
		const { player } = this.props;
		player.on('headGeneralChanged', this.onHeadGeneralChange);
		player.on('deputyGeneralChanged', this.onDeputyGeneralChange);
	}

	componentWillUnmount(): void {
		const { player } = this.props;
		player.on('headGeneralChanged', this.onHeadGeneralChange);
		player.on('deputyGeneralChanged', this.onDeputyGeneralChange);
	}

	onHeadGeneralChange = (headGeneral: GeneralProfile): void => this.setState({ headGeneral });

	onDeputyGeneralChange = (deputyGeneral: GeneralProfile): void => this.setState({ deputyGeneral });

	render(): JSX.Element {
		const {
			headGeneral,
			deputyGeneral,
		} = this.state;

		return (
			<div className="avatar-area">
				{headGeneral
					&& (
						<GeneralAvatar
							position="head"
							general={headGeneral}
						/>
					)}
				{deputyGeneral
					&& (
						<GeneralAvatar
							position="deputy"
							general={deputyGeneral}
						/>
					)}
			</div>
		);
	}
}

export default AvatarArea;
