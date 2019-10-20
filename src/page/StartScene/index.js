import React from 'react';
import ReactDOM from 'react-dom';

import Client from '@karuta/client';
import cmd from '@karuta/client/cmd';

import './index.scss';

import Toast from '../../component/Toast';
import Lobby from '../Lobby';


async function connectToServer(screenName) {
	const client = new Client();
	await client.connect('ws://localhost:2517');
	console.log('检查版本……');
	const version = await client.request(cmd.CheckVersion);
	console.log(`服务器版本：${version.name} (${version.build})`);
	const uid = await client.request(cmd.Login, { name: screenName });
	client.uid = uid;
	ReactDOM.render(
		<Lobby client={client} />,
		document.getElementById('app-container'),
	);
}

async function handleLogin(e) {
	e.preventDefault();
	const screenNameInput = document.getElementById('screen-name-input');
	const screenName = screenNameInput.value.substr(0, 8);
	if (screenName.length <= 0) {
		Toast.makeToast('请输入您的昵称。');
		return;
	}

	localStorage.setItem('screenName', screenName);

	const loginStatus = document.getElementById('login-status');
	function log(message) {
		loginStatus.innerHTML = message;
		console.log(message);
	}

	log('连接中……');
	try {
		await connectToServer(screenName);
	} catch (error) {
		console.error(error);
		log('连接失败。');
	}
}

class StartScene extends React.Component {
	componentDidMount() {
		const screenName = localStorage.getItem('screenName');
		if (screenName) {
			const input = document.getElementById('screen-name-input');
			input.value = screenName;
		}
	}


	render() {
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
						maxLength="8"
					/>
					<button type="submit" onClick={handleLogin}>登录</button>
				</div>
			</div>
		);
	}
}

export default StartScene;
