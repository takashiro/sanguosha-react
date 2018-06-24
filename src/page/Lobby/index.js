
import React from 'react';
import ReactDOM from 'react-dom';

import cmd from '../../protocol';
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

class Lobby extends React.Component {

	constructor(props) {
		super(props);
	}

	createRoom() {
		let client = this.props.client;
		if (!client) {
			return;
		}

		client.request(cmd.CreateRoom)
		.then(room_id => {
			client.roomId = room_id;

			// Add 7 robots here
			let robots = new Array(7);
			for (let i = 0; i < robots.length; i++) {
				robots[i] = new Robot(client.url, room_id, 'Robot ' + String.fromCharCode(0x41 + i));
			}

			return Promise.all(robots.map(robot => robot.connect()));
		})
		.then(() => {
			// Load Game
			client.send(cmd.LoadGame, 'sanguosha');

			if (client.roomId) {
				ReactDOM.render(
					<GeneralSelector client={client} />,
					document.getElementById('app-container')
				);
			} else {
				return Promise.relect('Failed to create a new room.');
			}
		})
		.catch(error => {
			console.log(error);
			Toast.makeToast(error);
			returnToStartScene();
		});
	}

	componentDidMount() {
		this.createRoom();
	}

	render() {
		return null;
	}

}

export default Lobby;
