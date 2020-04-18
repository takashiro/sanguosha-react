
import React from 'react';

import './index.scss';

interface Props {
	number: number;
}

function SeatNumber(props: Props): JSX.Element {
	const { number } = props;
	const style = {
		backgroundImage: `url(style/dashboard/seatnum/${number}.png)`,
	};
	return <i className="seat-number" style={style} />;
}

export default SeatNumber;
