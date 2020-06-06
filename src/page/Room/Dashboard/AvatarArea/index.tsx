
import React from 'react';
import { GeneralProfile } from '@karuta/sanguosha-core';

import Player from '../../../../game/Player';

import GeneralAvatar from './GeneralAvatar';
import SkillList from './SkillList';

import './index.scss';

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
		const { player } = this.props;
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
						>
							<SkillList position="head" area={player.getHeadSkillArea()} />
						</GeneralAvatar>
					)}
				{deputyGeneral
					&& (
						<GeneralAvatar
							position="deputy"
							general={deputyGeneral}
						>
							<SkillList position="deputy" area={player.getDeputySkillArea()} />
						</GeneralAvatar>
					)}
			</div>
		);
	}
}

export default AvatarArea;
