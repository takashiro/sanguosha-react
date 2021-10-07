import React from 'react';

import { PlayerPhase as Phase } from '@karuta/sanguosha-core';

import Player from '../../../game/Player';

interface Props {
	player: Player;
}

interface State {
	phase: Phase;
}

class PhaseBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			phase: Phase.Inactive,
		};
	}

	componentDidMount(): void {
		const { player } = this.props;
		player.on('phaseChanged', this.handlePhaseChange);
	}

	handlePhaseChange = (phase: Phase): void => this.setState({ phase });

	render(): JSX.Element | null {
		const { phase } = this.state;
		if (!phase) {
			return null;
		}

		const img = `style/phase/${Phase[phase].toLowerCase()}.png`;
		return (
			<div className="phase-bar">
				<img src={img} alt="" />
			</div>
		);
	}
}

export default PhaseBar;
