
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';
import DrawPile from './DrawPile';
import DiscardPile from './DiscardPile';
import AnimationCanvas from './AnimationCanvas';

function Room(props) {
	const { room } = props;
	return (
		<div className="room">
			<MainArea room={room} />
			<Dashboard dashboard={room.dashboard} />
			<DrawPile area={room.drawPile} />
			<DiscardPile area={room.discardPile} />
			<AnimationCanvas room={room} />
		</div>
	);
}

export default Room;
