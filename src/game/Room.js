
import EventEmitter from 'events';

import Player from './Player';
import CardPool from './CardPool';
import CardArea from './CardArea';

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

	client.bind(cmd.UpdatePlayer, update => {
		let player = this.players.find(player => player.uid() === update.uid);
		if (player) {
			player.setProperty(update.prop, update.value);
		}
	});

	client.bind(cmd.MoveCards, move => {
		let cards = null;
		if (move.cards) {
			cards = move.cards.map(card => this.cardPool.create(card));
		} else if (move.cardNum && !isNaN(move.cardNum)) {
			cards = new Array(move.cardNum);
		}

		let from = this.findArea(move.from);
		let to = this.findArea(move.to);
		from.remove(cards);
		to.add(cards);
	});
}

class Room extends EventEmitter {

	constructor(client) {
		super();

		this.client = client;
		this.dashboardUid = client.uid;
		this.players = [];

		bindCommand.call(this);
		window.$room = this;

		this.cardPool = new CardPool;

		this.drawPile = new CardArea(CardArea.Type.DrawPile);
		this.discardPile = new CardArea(CardArea.Type.DiscardPile);
	}

	start() {
		this.client.send(cmd.StartGame);
	}

	dashboardPlayer() {
		return this.players.find(player => player.uid() === this.dashboardUid);
	}

	otherPlayers() {
		return this.players.filter(player => player.uid() !== this.dashboardUid);
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
