import React from 'react';

import cmd from '@karuta/client/cmd';
import Robot from '../../ai/Robot';

import Toast from '../../component/Toast';

import './index.scss';

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
		const { onPageLoad } = this.props;
		setTimeout(onPageLoad, 0, 'general-selector');
	} else {
		throw new Error('Failed to create a new room.');
	}
}

class Lobby extends React.Component {
	constructor(props) {
		super(props);

		this.createRoom = this.createRoom.bind(this);
	}

	async createRoom() {
		try {
			await createRoom.call(this);
		} catch (error) {
			console.log(error);
			Toast.makeToast(error);
			this.returnToStartScene();
		}
	}

	returnToStartScene() {
		const { onPageLoad } = this.props;
		if (onPageLoad) {
			setTimeout(onPageLoad, 0, 'start-scene');
		}
	}

	render() {
		return (
			<div className="lobby">
				<div className="info-panel">
					<i className="logo" />
				</div>
				<div className="entrance-form">
					<button type="submit" onClick={this.createRoom}>创建房间</button>
					<input
						id="room-number-input"
						type="number"
						className="room-number"
						placeholder="房间号"
						maxLength="8"
					/>
					<button type="submit">进入房间</button>
				</div>
			</div>
		);
	}
}

export default Lobby;
