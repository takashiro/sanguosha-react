
import Client from '@karuta/client';
import cmd from '@karuta/client/cmd';

import bindMind from './mind';

class Robot {

	constructor(url, room_id, name) {
		let client = new Client(url);
		this.client = client;
		this.roomId = room_id;
		this.name = name;
	}

	async connect() {
		await this.client.connect();
		const uid = await this.client.request(cmd.Login, {name: this.name});
		this.client.uid = uid;
		await this.client.request(cmd.EnterRoom, this.roomId);
		bindMind(this.client);
	}

}

export default Robot;
