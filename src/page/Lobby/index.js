import React from 'react';
import ReactDOM from 'react-dom';

import cmd from '@karuta/client/cmd';

import Robot from '../../ai/Robot';

import GeneralSelector from '../GeneralSelector';
import Toast from '../../component/Toast';

function returnToStartScene() {
	// TO-DO: Return to start scene
}

async function createRoom() {
	const { client } = this.props;
	if (!client) {
		return;
	}

	const roomId = await client.request(cmd.CreateRoom);
	client.roomId = roomId;

	// Add 7 robots here
	const robots = new Array(7);
	for (let i = 0; i < robots.length; i++) {
		robots[i] = new Robot(client.url, roomId, `Robot ${String.fromCharCode(0x41 + i)}`);
	}

	await Promise.all(robots.map((robot) => robot.connect()));
	// Load Game
	client.send(cmd.LoadGame, 'sanguosha');

	if (client.roomId) {
		ReactDOM.render(
			<GeneralSelector client={client} />,
			document.getElementById('app-container'),
		);
	} else {
		throw new Error('Failed to create a new room.');
	}
}

class Lobby extends React.Component {
	componentDidMount() {
		this.createRoom();
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

	render() {
		return null;
	}
}

export default Lobby;
