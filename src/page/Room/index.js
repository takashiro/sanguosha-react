
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';

import cmd from '../../protocol';

function startGame() {
	const client = this.props.client;
	if (!client) {
		return;
	}

	client.send(cmd.StartGame);
}

class Room extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		startGame.call(this);
	}

	render() {
		return <div className="room">
			<MainArea />
			<Dashboard />
		</div>;
	}

}

export default Room;
