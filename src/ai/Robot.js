
import cmd from '../protocol';
import Client from '../net/Client';

class Robot {

	constructor(url, room_id) {
		let client = new Client(url);
		this.client = client;
		this.roomId = room_id;
	}

	connect() {
		return new Promise((resolve, reject) => {
			this.client.on('open', () => {
				this.client.request(cmd.EnterRoom, this.roomId)
				.then(resolve)
				.catch(reject);
			});
			this.client.on('close', reject);
			this.client.connect();
		});
	}

}

export default Robot;
