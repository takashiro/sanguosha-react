
import React from 'react';
import ReactDOM from 'react-dom';

import Client from '@karuta/client';

import './index.scss';

import Toast from '../../component/Toast';
import Lobby from '../Lobby';

import cmd from '@karuta/client/cmd';

async function connectToServer(screenName) {
	const client = new Client;
	await client.connect('ws://localhost:2517');
	console.log('检查版本……');
	const version = await client.request(cmd.CheckVersion);
	console.log(`服务器版本：${version.name} (${version.build})`);
	const uid = await client.request(cmd.Login, {name: screenName});
	client.uid = uid;
	ReactDOM.render(
		<Lobby client={client} />,
		document.getElementById('app-container')
	);
}

async function handleLogin(e) {
	e.preventDefault();
	let screenNameInput = document.getElementById('screen-name-input');
	let screenName = screenNameInput.value.substr(0, 8);
	if (screenName.length <= 0) {
		return Toast.makeToast('请输入您的昵称。');
	}

	localStorage.setItem('screenName', screenName);

	let login_status = document.getElementById('login-status');
	function log(message) {
		login_status.innerHTML = message;
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

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let screen_name = localStorage.getItem('screenName');
		if (screen_name) {
			let screen_name_input = document.getElementById('screen-name-input');
			screen_name_input.value = screen_name;
		}
	}


	render() {
		return <div className="start-scene">
			<div className="info-panel">
				<i className="logo" />
				<div id="login-status"></div>
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
		</div>;
	}

}

export default StartScene;
