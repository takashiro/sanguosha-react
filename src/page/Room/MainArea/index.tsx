import React from 'react';

import PhotoLayout from './PhotoLayout';
import MultiAreaSelector from './MultiAreaSelector';

import Room from '../../../game/Room';

import './index.scss';

interface MainAreaProps {
	room: Room;
}

function MainArea(props: MainAreaProps): JSX.Element {
	const { room } = props;
	return (
		<div className="main-area">
			<PhotoLayout room={room} />
			<MultiAreaSelector room={room} />
		</div>
	);
}

export default MainArea;
