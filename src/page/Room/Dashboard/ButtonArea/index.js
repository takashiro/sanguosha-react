
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import SeatNumber from './SeatNumber';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import FinishButton from './FinishButton';

class ButtonArea extends React.Component {

	render() {
		return <div className="button-area">
			<KingdomIcon />
			<ConfirmButton />
			<CancelButton />
			<FinishButton />
			<SeatNumber />
		</div>;
	}

}

export default ButtonArea;
