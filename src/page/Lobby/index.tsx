import React from 'react';

import {
	Command as cmd,
	Client,
} from '@karuta/client';
import Robot from '@karuta/sanguosha-ai';

import Page from '../../Page';
import PageLoader from '../../PageLoader';
import Toast from '../../component/Toast';

import './index.scss';

interface Props {
	client: Client;
	onPageLoad: (loader: PageLoader) => void;
}

class Lobby extends React.Component<Props, {}> {
	createRoom = async (): Promise<void> => {
		try {
			const { client } = this.props;
			if (!client) {
				return;
			}

			const roomId = await client.request(cmd.CreateRoom);

			// Add 7 robots here
			const robots = new Array(7);
			for (let i = 0; i < robots.length; i++) {
				robots[i] = new Robot(roomId, `Robot ${String.fromCharCode(0x41 + i)}`);
			}
			await Promise.all(robots.map((robot) => robot.connect(client.getUrl())));
			// Load Game
			client.send(cmd.LoadGame, 'sanguosha');

			if (roomId) {
				const { onPageLoad } = this.props;
				onPageLoad({
					page: Page.GeneralSelector,
					roomId,
				});
			} else {
				throw new Error('Failed to create a new room.');
			}
		} catch (error) {
			console.log(error);
			Toast.makeToast(error);
			this.returnToStartScene();
		}
	}

	returnToStartScene(): void {
		const { onPageLoad } = this.props;
		if (onPageLoad) {
			onPageLoad({
				page: Page.StartScene,
			});
		}
	}

	render(): JSX.Element {
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
						maxLength={8}
					/>
					<button type="submit">进入房间</button>
				</div>
			</div>
		);
	}
}

export default Lobby;
