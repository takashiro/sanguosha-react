
import React from 'react';

import Phase from '../../../game/Player/Phase';

class PhaseBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			phase: Phase.Invalid,
		};

		const { player } = props;
		player.on('phaseChanged', (phase) => this.setState({ phase }));
	}

	render() {
		let { phase } = this.state;
		if (!phase || phase === Phase.Invalid || phase === Phase.Inactive) {
			return null;
		}

		phase = Phase.fromNum(phase);
		if (!phase) {
			return null;
		}

		const img = `style/phase/${phase.toLowerCase()}.png`;
		return (
			<div className="phase-bar">
				<img src={img} alt="" />
			</div>
		);
	}
}

export default PhaseBar;
