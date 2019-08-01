
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';

class ButtonArea extends React.Component {

	render() {
		const player = this.props.player;

		return <div className="button-area">
			<KingdomIcon />
			<ConfirmButton />
			<CancelButton />
			<FinishButton />
			<SeatNumber number={player.seat()} />
		</div>;
	}

}

export default ButtonArea;
