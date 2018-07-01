
import React from 'react';

import Phase from '../../../game/Player/Phase';

class PhaseBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			phase: Phase.Invalid,
		};

		const player = props.player;
		player.on('phaseChanged', phase => this.setState({phase}));
	}

	render() {
		let phase = this.state.phase;
		if (!phase || phase === Phase.Invalid || phase === Phase.Inactive) {
			return null;
		}

		phase = Phase.fromNum(this.state.phase);
		if (!phase) {
			return null;
		}

		let img = 'style/phase/' + phase.toLowerCase() + '.png';
		return <div className="phase-bar">
			<img src={img} />
		</div>;
	}

}

export default PhaseBar;
