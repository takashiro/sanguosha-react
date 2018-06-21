
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import Toast from '../../component/Toast';
import Lobby from '../Lobby';

import cmd from '../../protocol';
import Client from '../../net/Client';

function handleLogin(e) {
	e.preventDefault();
	let screen_name_input = document.getElementById('screen-name-input');
	let screen_name = screen_name_input.value.substr(0, 8);
	if (screen_name.length <= 0) {
		return Toast.makeToast('请输入您的昵称。');
	}

	let login_status = document.getElementById('login-status');
	function log(message) {
		login_status.innerHTML = message;
		console.log(message);
	}

	log('连接中……');

	const client = new Client;
	client.once('open', () => {
		log('检查版本……');
		client.request(cmd.CheckVersion)
		.then(version => {
			log(`服务器版本：${version.name} (${version.build})`);

			ReactDOM.render(
				<Lobby client={client} />,
				document.getElementById('app-container')
			);
		});
	});
	client.once('close', () => {
		log('连接失败。');
	});
	client.on('error', message => log(message));
	client.connect('ws://localhost:2517');
}

class StartScene extends React.Component {

	constructor(props) {
		super(props);
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
