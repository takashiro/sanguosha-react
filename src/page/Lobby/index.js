
import React from 'react';
import ReactDOM from 'react-dom';

import cmd from '@karuta/client/cmd';

import Robot from '../../ai/Robot';

import StartScene from '../StartScene';
import GeneralSelector from '../GeneralSelector';
import Toast from '../../component/Toast';

function returnToStartScene() {
	ReactDOM.render(
		<StartScene />,
		document.getElementById('app-container')
	);
}

async function createRoom() {
	let client = this.props.client;
	if (!client) {
		return;
	}

	const room_id = await client.request(cmd.CreateRoom);
	client.roomId = room_id;

	// Add 7 robots here
	let robots = new Array(7);
	for (let i = 0; i < robots.length; i++) {
		robots[i] = new Robot(client.url, room_id, 'Robot ' + String.fromCharCode(0x41 + i));
	}

	await Promise.all(robots.map(robot => robot.connect()));
	// Load Game
	client.send(cmd.LoadGame, 'sanguosha');

	if (client.roomId) {
		ReactDOM.render(
			<GeneralSelector client={client} />,
			document.getElementById('app-container')
		);
	} else {
		return Promise.reject('Failed to create a new room.');
	}
}

class Lobby extends React.Component {

	constructor(props) {
		super(props);
	}

	async createRoom() {
		try {
			await createRoom.call(this);
		} catch (error) {
			console.log(error);
			Toast.makeToast(error);
			returnToStartScene();
		}
	}

	componentDidMount() {
		this.createRoom();
	}

	render() {
		return null;
	}

}

export default Lobby;
