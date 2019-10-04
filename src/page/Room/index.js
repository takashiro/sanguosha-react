
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';
import DiscardPile from './DiscardPile';
import AnimationCanvas from './AnimationCanvas';

class Room extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const room = this.props.room;
		return <div className="room">
			<MainArea room={room} />
			<Dashboard room={room} />
			<DiscardPile area={room.discardPile} />
			<AnimationCanvas room={room} />
		</div>;
	}

}

export default Room;
