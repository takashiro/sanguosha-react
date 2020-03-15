import React from 'react';

import {
	Command as cmd,
	Client,
} from '@karuta/client';

import Toast from '../../component/Toast';

import Page from '../../Page';
import PageLoader from '../../PageLoader';

import './index.scss';

interface Props {
	onPageLoad: (option: PageLoader) => void;
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
		e.preventDefault();
		const screenNameInput = document.getElementById('screen-name-input') as HTMLInputElement;
		const screenName = screenNameInput.value.substr(0, 8);
		if (screenName.length <= 0) {
			Toast.makeToast('请输入您的昵称。');
			return;
		}

		localStorage.setItem('screenName', screenName);

		const loginStatus = document.getElementById('login-status') as HTMLDivElement;
		function log(message: string): void {
			loginStatus.innerHTML = message;
			console.log(message);
		}

		const { onPageLoad } = this.props;
		log('连接中……');
		try {
			await this.connectToServer(screenName);
			onPageLoad({
				page: Page.Lobby,
				userId: this.uid,
				client: this.client,
			});
		} catch (error) {
			console.error(error);
			log('连接失败。');
		}
	}

	async connectToServer(screenName: string): Promise<void> {
		const client = new Client();
		await client.connect('ws://localhost:2517');
		console.log('检查版本……');
		const version = await client.request(cmd.CheckVersion);
		console.log(`服务器版本：${version.name} (${version.build})`);
		const uid = await client.request(cmd.Login, { name: screenName });
		this.uid = uid;
		this.client = client;
	}

	render(): JSX.Element {
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
						placeholder="昵称"
						maxLength={8}
					/>
					<button type="submit" onClick={this.handleLogin}>登录</button>
				</div>
			</div>
		);
	}
}

export default StartScene;
