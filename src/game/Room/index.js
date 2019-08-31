
import EventEmitter from 'events';

import CardArea from '../CardArea';
import DrawPile from './DrawPile';

import cmd from '../../protocol';
import CommandMap from './cmd';

function bindCommand() {
	const client = this.client;
	for (const [command, callback] of CommandMap) {
		client.bind(command, callback.bind(this));
	}
}

class Room extends EventEmitter {

	constructor(client) {
		super();

		this.client = client;
		this.dashboardUid = client.uid;
		this.players = [];
		this.drawPile = new DrawPile;
		this.discardPile = new CardArea(CardArea.Type.DiscardPile);

		bindCommand.call(this);
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
