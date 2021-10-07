import React from 'react';
import {
	FormattedMessage,
	IntlShape,
	injectIntl,
	defineMessages,
} from 'react-intl';

import {
	Command as cmd,
	Client,
} from '@karuta/client';
import Robot from '@karuta/sanguosha-ai';

import Page from '../../Page';
import PageLoader from '../../PageLoader';
import Toast from '../../component/Toast';

import './index.scss';

const desc = defineMessages({
	roomNumber: { id: 'room-number' },
	failedToCreateRoom: { id: 'failed-to-create-room' },
});

interface Props {
	client: Client;
	onPageLoad: (loader: PageLoader) => void;
	intl: IntlShape;
}

class Lobby extends React.Component<Props, unknown> {
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
			client.send(cmd.LoadGame, '@karuta/sanguosha');

			if (roomId) {
				const { onPageLoad } = this.props;
				onPageLoad({
					page: Page.GeneralSelector,
					roomId,
				});
			} else {
				const { intl } = this.props;
				throw new Error(intl.formatMessage(desc.failedToCreateRoom));
			}
		} catch (error) {
			console.log(error);
			Toast.makeToast(String(error));
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
		const { intl } = this.props;
		return (
			<div className="lobby">
				<div className="info-panel">
					<i className="logo" />
				</div>
				<div className="entrance-form">
					<button type="submit" onClick={this.createRoom}>
						<FormattedMessage id="create-room" defaultMessage="Create Room" />
					</button>
					<input
						id="room-number-input"
						type="number"
						className="room-number"
						placeholder={intl.formatMessage(desc.roomNumber)}
						maxLength={8}
					/>
					<button type="submit">
						<FormattedMessage id="enter-room" defaultMessage="Enter Room" />
					</button>
				</div>
			</div>
		);
	}
}

export default injectIntl(Lobby);
