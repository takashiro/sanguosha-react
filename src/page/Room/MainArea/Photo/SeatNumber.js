
import React from 'react';

const seatTexts = [
	'零',
	'一',
	'二',
	'三',
	'四',
	'五',
	'六',
	'七',
	'八',
	'九',
	'十',
	'十一',
	'十二',
];

class SeatNumber extends React.Component {
	render() {
		const seatText = seatTexts[this.props.number];
		return <span className="seat-number">{seatText}</span>;
	}
}

export default SeatNumber;
