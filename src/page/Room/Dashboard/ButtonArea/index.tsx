
import React from 'react';
import { Kingdom } from '@karuta/sanguosha-core';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';

import Dashboard from '../../../../game/Room/Dashboard';
import Player from '../../../../game/Player';

interface AreaProps {
	dashboard: Dashboard;
}

interface AreaState {
	kingdom: Kingdom;
	confirmEnabled: boolean;
	cancelEnabled: boolean;
	finishEnabled: boolean;
}

class ButtonArea extends React.Component<AreaProps, AreaState> {
	constructor(props: AreaProps) {
		super(props);

		const { dashboard } = this.props;
		const player = dashboard.getPlayer();

		this.state = {
			kingdom: player ? player.getKingdom() : Kingdom.Unknown,
			confirmEnabled: false,
			cancelEnabled: false,
			finishEnabled: false,
		};
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('playerChanged', this.onPlayerChanged);
		dashboard.on('confirmEnabledChanged', this.onConfirmEnabled);
		dashboard.on('cancelEnabledChanged', this.onCancelEnabled);
		dashboard.on('finishEnabledChanged', this.onFinishEnabled);

		const player = dashboard.getPlayer();
		if (player) {
			player.on('kingdomChanged', this.onPlayerKingdomChanged);
		}
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('playerChanged', this.onPlayerChanged);
		dashboard.off('confirmEnabledChanged', this.onConfirmEnabled);
		dashboard.off('cancelEnabledChanged', this.onCancelEnabled);
		dashboard.off('finishEnabledChanged', this.onFinishEnabled);

		const player = dashboard.getPlayer();
		if (player) {
			player.off('kingdomChanged', this.onPlayerKingdomChanged);
		}
	}

	onPlayerChanged = (player: Player): void => {
		this.setState({ kingdom: player.getKingdom() });
	}

	onPlayerKingdomChanged = (kingdom: Kingdom): void => {
		this.setState({ kingdom });
	}

	onConfirmEnabled = (enabled: boolean): void => {
		this.setState({ confirmEnabled: enabled });
	}

	onCancelEnabled = (enabled: boolean): void => {
		this.setState({ cancelEnabled: enabled });
	}

	onFinishEnabled = (enabled: boolean): void => {
		this.setState({ finishEnabled: enabled });
	}

	onConfirmClicked = (): void => {
		const { dashboard } = this.props;
		dashboard.confirm();
	}

	onCancelClicked = (): void => {
		const { dashboard } = this.props;
		dashboard.cancel();
	}

	onFinishClicked = (): void => {
		const { dashboard } = this.props;
		dashboard.finish();
	}

	render(): JSX.Element {
		const { dashboard } = this.props;
		const player = dashboard.getPlayer();

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
				<SeatNumber number={player ? player.getSeat() : 0} />
			</div>
		);
	}
}

export default ButtonArea;
