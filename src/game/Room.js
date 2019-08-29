
import EventEmitter from 'events';

import Player from './Player';
import CardArea from './CardArea';
import CardPath from './CardPath';
import DrawPile from './DrawPile';

import cmd from '../protocol';

function sortPlayerSeat() {
	const dashboardPlayer = this.players.find(player => player.uid() === this.dashboardUid);
	const dashboardSeat = dashboardPlayer.seat();
	const playerNum = this.players.length;

	function getRelativeSeat(player) {
		let seat = player.seat() - dashboardSeat;
		if (seat < 0) {
			seat += playerNum;
		}
		return seat;
	}

	this.players.sort(function (a, b) {
		const p = getRelativeSeat(a);
		const q = getRelativeSeat(b);
		return p - q;
	});
}

function bindCommand() {
	const client = this.client;

	client.bind(cmd.ArrangeSeats, players => {
		this.players = [];
		for (let props of players) {
			let player = new Player(props.uid, props.seat, props.name);
			this.players.push(player);
		}

		sortPlayerSeat.call(this);
		this.emit('playerChanged', this.players);
	});

	client.bind(cmd.UpdatePlayer, update => {
		let player = this.players.find(player => player.uid() === update.uid);
		if (player) {
			player.setProperty(update.prop, update.value);
		}
	});

	client.bind(cmd.MoveCards, move => {
		const from = this.findArea(move.from);
		const to = this.findArea(move.to);

		// Move cards at back-end
		const cards = from.remove(move.cards || new Array(move.cardNum).fill(null));
		to.add(cards);

		// Play card move animation
		const path = new CardPath(cards);
		from.postStartPos(path);
		to.postEndPos(path);
		this.emit('cardmove', path);
	});
}

class Room extends EventEmitter {

	constructor(client) {
		super();

		this.client = client;
		this.dashboardUid = client.uid;
		this.players = [];

		bindCommand.call(this);

		this.drawPile = new DrawPile;
		this.discardPile = new CardArea(CardArea.Type.DiscardPile);
	}

	start() {
		this.client.send(cmd.StartGame);
	}

	dashboardPlayer() {
		return this.players[0];
	}

	otherPlayers() {
		return this.players.slice(1);
	}

	findPlayer(uid) {
		return this.players.find(player => player.uid() === uid);
	}

	findArea(info) {
		if (info.owner) {
			let player = this.findPlayer(info.owner);
			if (!player) {
				return null;
			}

			switch (info.type) {
			case CardArea.Type.Hand:
				return player.handArea;
			case CardArea.Type.Equip:
				return player.equipArea;
			case CardArea.Type.DelayedTrick:
				return player.delayedTrickArea;
			case CardArea.Type.Judge:
				return player.judgeArea;
			}
		}

		switch (info.type) {
		case CardArea.Type.DrawPile:
			return this.drawPile;
		case CardArea.Type.DiscardPile:
			return this.discardPile;
		}
		return null;
	}

}

export default Room;
