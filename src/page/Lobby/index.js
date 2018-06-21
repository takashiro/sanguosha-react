
import React from 'react';
import ReactDOM from 'react-dom';

import cmd from '../../protocol';
import Robot from '../../ai/Robot';

import StartScene from '../StartScene';
import Room from '../Room';
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
			// Add 7 robots here
			let robots = new Array(7);
			for (let i = 0; i < robots.length; i++) {
				robots[i] = new Robot(client.url, room_id);
			}

			let robotReady = Promise.all(robots.map(robot => robot.connect()));

			// Load Game
			client.send(cmd.LoadGame, 'sanguosha');

			// Render room
			robotReady
			.then(() => {
				if (room_id >= 0) {
					ReactDOM.render(
						<Room id={room_id} client={client} robots={robots} />,
						document.getElementById('app-container')
					);
				} else {
					Toast.makeToast('Failed to create a new room.');
					returnToStartScene();
				}
			})
			.catch(error => {
				console.log(error);
				returnToStartScene();
			});
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
