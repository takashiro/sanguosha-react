
import cmd from '../protocol';
import Client from '../net/Client';

class Robot {

	constructor(url, room_id, name) {
		let client = new Client(url);
		this.client = client;
		this.roomId = room_id;
		this.name = name;
	}

	connect() {
		return this.client.connect()
		.then(() => {
			return this.client.request(cmd.Login, {name: this.name});
		})
		.then(uid => {
			this.client.uid = uid;
			return this.client.request(cmd.EnterRoom, this.roomId);
		});
	}

}

export default Robot;
