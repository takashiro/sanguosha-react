import React from 'react';
import {
	MessageDescriptor,
	defineMessage,
	useIntl,
} from 'react-intl';

const seatTexts: MessageDescriptor[] = [
	defineMessage({ id: 'zero' }),
	defineMessage({ id: 'one' }),
	defineMessage({ id: 'two' }),
	defineMessage({ id: 'three' }),
	defineMessage({ id: 'four' }),
	defineMessage({ id: 'five' }),
	defineMessage({ id: 'six' }),
	defineMessage({ id: 'seven' }),
	defineMessage({ id: 'eight' }),
	defineMessage({ id: 'nine' }),
	defineMessage({ id: 'ten' }),
	defineMessage({ id: 'eleven' }),
	defineMessage({ id: 'twelve' }),
];

interface SeatNumberProps {
	number: number;
}

function SeatNumber(props: SeatNumberProps): JSX.Element {
	const intl = useIntl();
	const { number } = props;
	const seatText = intl.formatMessage(seatTexts[number]);
	return <span className="seat-number">{seatText}</span>;
}

export default SeatNumber;
