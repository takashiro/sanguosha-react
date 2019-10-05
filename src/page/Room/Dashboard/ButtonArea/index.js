
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';
import Phase from '../../../../game/Player/Phase';

function onDashboardEnabled(enabled) {
	this.setState({ enabled });
}

function onPlayerChanged(player) {
	this.setState({ kingdom: player.kingdom() });
}

function onPlayerKingdomChanged(kingdom) {
	this.setState({ kingdom });
}

class ButtonArea extends React.Component {

	constructor(props) {
		super(props);

		const { dashboard } = this.props;
		const player = dashboard.player();

		this.state = {
			kingdom: player.kingdom(),
			enabled: false,
		};

		this.onDashboardEnabled = onDashboardEnabled.bind(this);
		this.onPlayerChanged = onPlayerChanged.bind(this);
		this.onPlayerKingdomChanged = onPlayerKingdomChanged.bind(this);
	}

	componentDidMount() {
		const { dashboard } = this.props;
		dashboard.on('enabledChanged', this.onDashboardEnabled);
		dashboard.on('playerChanged', this.onPlayerChanged);
		const player = dashboard.player();
		player.on('kingdomChanged', this.onPlayerKingdomChanged);
	}

	componentWillUnmount() {
		const { dashboard } = this.props;
		dashboard.off('enabledChanged', this.onDashboardEnabled);
		dashboard.off('playerChanged', this.onPlayerChanged);
		const player = dashboard.player();
		player.off('kingdomChanged', this.onPlayerKingdomChanged);
	}

	render() {
		const { dashboard } = this.props;
		const { enabled } = this.state;
		const player = dashboard.player();

		return <div className="button-area">
			<KingdomIcon kingdom={this.state.kingdom} />
			<ConfirmButton enabled={enabled} />
			<CancelButton enabled={enabled} />
			<FinishButton enabled={enabled && player.phase() === Phase.Play} />
			<SeatNumber number={player.seat()} />
		</div>;
	}

}

export default ButtonArea;
