
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

class ButtonArea extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			enabled: false,
		};

		this.onDashboardEnabled = onDashboardEnabled.bind(this);
	}

	componentDidMount() {
		const { dashboard } = this.props;
		dashboard.on('enabledChanged', this.onDashboardEnabled);
	}

	componentWillUnmount() {
		const { dashboard } = this.props;
		dashboard.off('enabledChanged', this.onDashboardEnabled);
	}

	render() {
		const { dashboard } = this.props;
		const { enabled } = this.state;
		const player = dashboard.player();

		return <div className="button-area">
			<KingdomIcon />
			<ConfirmButton enabled={enabled} />
			<CancelButton enabled={enabled} />
			<FinishButton enabled={enabled && player.phase() === Phase.Play} />
			<SeatNumber number={player.seat()} />
		</div>;
	}

}

export default ButtonArea;
