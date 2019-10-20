
import React from 'react';

import './index.scss';

class SeatNumber extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			number: props.number ? props.number : 1,
		};
	}

	render() {
		const { number } = this.state;
		const style = {
			backgroundImage: `url(style/dashboard/seatnum/${number}.png)`,
		};
		return <i className="seat-number" style={style} />;
	}
}

export default SeatNumber;
