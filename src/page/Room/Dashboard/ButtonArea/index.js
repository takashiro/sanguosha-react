
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';
import Phase from '../../../../game/Player/Phase';

function onHandAreaEnabled(enabled) {
	this.setState({ enabled });
}

class ButtonArea extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			enabled: false,
		};

		this.onHandAreaEnabled = onHandAreaEnabled.bind(this);
	}

	componentDidMount() {
		const { player } = this.props;
		const { handArea } = player;
		handArea.on('enabledchanged', this.onHandAreaEnabled);
	}

	componentWillUnmount() {
		const { player } = this.props;
		const { handArea } = player;
		handArea.off('enabledchanged', this.onHandAreaEnabled);
	}

	render() {
		const { player } = this.props;
		const { enabled } = this.state;

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
