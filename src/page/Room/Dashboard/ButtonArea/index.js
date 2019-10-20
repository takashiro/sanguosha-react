
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';

function onPlayerChanged(player) {
	this.setState({ kingdom: player.kingdom() });
}

function onPlayerKingdomChanged(kingdom) {
	this.setState({ kingdom });
}

function onConfirmEnabled(enabled) {
	this.setState({ confirmEnabled: enabled });
}

function onCancelEnabled(enabled) {
	this.setState({ cancelEnabled: enabled });
}

function onFinishEnabled(enabled) {
	this.setState({ finishEnabled: enabled });
}

function onConfirmClicked() {
	const { dashboard } = this.props;
	dashboard.confirm();
}

function onCancelClicked() {
	const { dashboard } = this.props;
	dashboard.cancel();
}

function onFinishClicked() {
	const { dashboard } = this.props;
	dashboard.finish();
}

class ButtonArea extends React.Component {
	constructor(props) {
		super(props);

		const { dashboard } = this.props;
		const player = dashboard.player();

		this.state = {
			kingdom: player.kingdom(),
			confirmEnabled: false,
			cancelEnabled: false,
			finishEnabled: false,
		};

		this.onPlayerChanged = onPlayerChanged.bind(this);
		this.onPlayerKingdomChanged = onPlayerKingdomChanged.bind(this);
		this.onConfirmEnabled = onConfirmEnabled.bind(this);
		this.onCancelEnabled = onCancelEnabled.bind(this);
		this.onFinishEnabled = onFinishEnabled.bind(this);
		this.onConfirmClicked = onConfirmClicked.bind(this);
		this.onCancelClicked = onCancelClicked.bind(this);
		this.onFinishClicked = onFinishClicked.bind(this);
	}

	componentDidMount() {
		const { dashboard } = this.props;
		dashboard.on('playerChanged', this.onPlayerChanged);
		dashboard.on('confirmEnabledChanged', this.onConfirmEnabled);
		dashboard.on('cancelEnabledChanged', this.onCancelEnabled);
		dashboard.on('finishEnabledChanged', this.onFinishEnabled);

		const player = dashboard.player();
		player.on('kingdomChanged', this.onPlayerKingdomChanged);
	}

	componentWillUnmount() {
		const { dashboard } = this.props;
		dashboard.off('playerChanged', this.onPlayerChanged);
		dashboard.off('confirmEnabledChanged', this.onConfirmEnabled);
		dashboard.off('cancelEnabledChanged', this.onCancelEnabled);
		dashboard.off('finishEnabledChanged', this.onFinishEnabled);

		const player = dashboard.player();
		player.off('kingdomChanged', this.onPlayerKingdomChanged);
	}

	render() {
		const { dashboard } = this.props;
		const player = dashboard.player();

		const {
			kingdom,
			confirmEnabled,
			cancelEnabled,
			finishEnabled,
		} = this.state;
		return (
			<div className="button-area">
				<KingdomIcon kingdom={kingdom} />
				<ConfirmButton enabled={confirmEnabled} onClick={this.onConfirmClicked} />
				<CancelButton enabled={cancelEnabled} onClick={this.onCancelClicked} />
				<FinishButton enabled={finishEnabled} onClick={this.onFinishClicked} />
				<SeatNumber number={player.seat()} />
			</div>
		);
	}
}

export default ButtonArea;
