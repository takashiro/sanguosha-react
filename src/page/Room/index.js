
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';

import GameRoom from '../../game/Room';

class Room extends React.Component {

	constructor(props) {
		super(props);

		this.room = new GameRoom(props.client);
	}

	componentDidMount() {
		this.room.start();
	}

	render() {
		return <div className="room">
			<MainArea room={this.room} />
			<Dashboard room={this.room} />
		</div>;
	}

}

export default Room;
