
import EventEmitter from 'events';

import Player from './Player';

import cmd from '../protocol';

function bindCommand() {
	const client = this.client;

	client.bind(cmd.ArrangeSeats, players => {
		for (let props of players) {
			let player = new Player(props.uid, props.seat, props.name);
			this.players.push(player);
		}

		this.emit('playerChanged', this.players);
	});
}

class Room extends EventEmitter {

	constructor(client) {
		super();

		this.client = client;
		this.dashboardUid = 0;
		this.players = [];

		bindCommand.call(this);
		window.$room = this;
	}

	start() {
		this.client.request(cmd.Login)
		.then(user_id => {
			this.dashboardUid = user_id;
			this.client.send(cmd.StartGame);
		});
	}

	dashboardPlayer() {
		return this.players.find(player => player.uid() === this.dashboardUid);
	}

	otherPlayers() {
		return this.players.filter(player => player.uid() !== this.dashboardUid);
	}

}

export default Room;
