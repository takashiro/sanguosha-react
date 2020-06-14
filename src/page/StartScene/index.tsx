import React from 'react';
import {
	IntlShape,
	injectIntl,
	defineMessages,
} from 'react-intl';

import {
	Command as cmd,
	Client,
} from '@karuta/client';

import Toast from '../../component/Toast';

import Page from '../../Page';
import PageLoader from '../../PageLoader';

import './index.scss';

const descriptor = defineMessages({
	nickname: { id: 'nickname' },
	login: { id: 'login' },
	enterNickName: { id: 'please-enter-your-nickname' },
	connecting: { id: 'connecting...' },
	connectionFailed: { id: 'connection-failed' },
});

interface Props {
	onPageLoad: (option: PageLoader) => void;
	intl: IntlShape;
}

class StartScene extends React.Component<Props, {}> {
	private uid?: number;

	private client?: Client;

	componentDidMount(): void {
		const screenName = localStorage.getItem('screenName');
		if (screenName) {
			const input = document.getElementById('screen-name-input') as HTMLInputElement;
			input.value = screenName;
		}
	}

	handleLogin = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		const { intl } = this.props;

		e.preventDefault();
		const screenNameInput = document.getElementById('screen-name-input') as HTMLInputElement;
		const screenName = screenNameInput.value.substr(0, 8);
		if (screenName.length <= 0) {
			Toast.makeToast(intl.formatMessage(descriptor.enterNickName));
			return;
		}

		localStorage.setItem('screenName', screenName);

		const loginStatus = document.getElementById('login-status') as HTMLDivElement;
		function log(message: string): void {
			loginStatus.innerHTML = message;
			console.log(message);
		}

		const { onPageLoad } = this.props;
		log(intl.formatMessage(descriptor.connecting));
		try {
			await this.connectToServer(screenName);
			onPageLoad({
				page: Page.Lobby,
				userId: this.uid,
				client: this.client,
			});
		} catch (error) {
			console.error(error);
			log(intl.formatMessage(descriptor.connectionFailed));
		}
	}

	async connectToServer(screenName: string): Promise<void> {
		const client = new Client();
		await client.connect('ws://localhost:2517');
		console.log('Checking version...');
		const version = await client.request(cmd.CheckVersion);
		console.log(`Server Version: ${version.name} (${version.build})`);
		const uid = await client.request(cmd.Login, { name: screenName });
		this.uid = uid;
		this.client = client;
	}

	render(): JSX.Element {
		const { intl } = this.props;
		return (
			<div className="start-scene">
				<div className="info-panel">
					<i className="logo" />
					<div id="login-status" />
				</div>
				<div className="login-form">
					<input
						id="screen-name-input"
						type="text"
						className="screen-name"
						placeholder={intl.formatMessage(descriptor.nickname)}
						maxLength={8}
					/>
					<button type="submit" onClick={this.handleLogin}>{intl.formatMessage(descriptor.login)}</button>
				</div>
			</div>
		);
	}
}

export default injectIntl(StartScene);
