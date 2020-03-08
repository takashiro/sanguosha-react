
import EventEmitter from 'events';

import CardArea from '../CardArea';
import CardPile from '../CardPile';
import Dashboard from './Dashboard';

import cmd from '../../protocol';
import CommandMap from './cmd';

function bindCommand() {
	const { client } = this;
	for (const [command, callback] of CommandMap) {
		client.bind(command, callback.bind(this));
	}
}

class Room extends EventEmitter {
	constructor(client) {
		super();

		this.client = client;
		this.dashboard = new Dashboard(client.uid);
		this.selectable = false;
		this.players = [];
		this.drawPile = new CardPile(CardPile.Type.Draw);
		this.discardPile = new CardPile(CardPile.Type.Discard);

		this.client.on('lockerChanged', () => this.emit('lockerChanged'));

		bindCommand.call(this);
	}

	start() {
		this.client.send(cmd.StartGame);
	}

	getClient() {
		return this.client;
	}

	getDashboard() {
		return this.dashboard;
	}

	getDashboardUid() {
		return this.dashboard.getUid();
	}

	getDashboardPlayer() {
		return this.dashboard.getPlayer();
	}

	isSelectable() {
		return this.selectable;
	}

	setSelectable(selectable) {
		this.selectable = selectable;
		this.emit('selectableChanged', selectable);
	}

	resetSelection() {
		this.setSelectable(false);
		for (const player of this.players) {
			player.setSelectable(false);
			player.setSelected(false);
		}
	}

	getPlayers() {
		return this.players;
	}

	setPlayers(players) {
		this.players = players;
		this.emit('playersChanged', players);

		const listenerMap = {
			selectedChanged: [],
			phaseChanged: [],
		};
		for (const player of players) {
			const selectedListener = () => {
				this.emit('selectedPlayerChanged', player);
			};
			listenerMap.selectedChanged.push(selectedListener);
			player.on('selectedChanged', selectedListener);

			const phaseListener = () => {
				this.resetSelection();
				this.dashboard.resetSelection();
			};
			player.on('phaseChanged', phaseListener);
			listenerMap.phaseChanged.push(phaseListener);
		}

		this.once('playersChanged', () => {
			for (const event of Object.keys(listenerMap)) {
				const listeners = listenerMap[event];
				for (let i = 0; i < players.length; i++) {
					players[i].off(event, listeners[i]);
				}
			}
		});
	}

	getOtherPlayers() {
		return this.players.slice(1);
	}

	findPlayer(seat) {
		return this.players.find((player) => player.getSeat() === seat);
	}

	findArea(info) {
		if (info.owner) {
			const player = this.findPlayer(info.owner);
			if (!player) {
				return null;
			}

			switch (info.type) {
			case CardArea.Type.Hand:
				return player.getHandArea();
			case CardArea.Type.Equip:
				return player.getEquipArea();
			case CardArea.Type.Judge:
				return player.getJudgeArea();
			case CardArea.Type.Process:
				return this.discardPile;
			default:
				return null;
			}
		}

		switch (info.type) {
		case CardArea.Type.DrawPile:
			return this.drawPile;
		case CardArea.Type.DiscardPile:
			return this.discardPile;
		default:
			return null;
		}
	}

	lock() {
		return this.client.lock();
	}

	send(command, args) {
		this.client.send(command, args);
	}

	reply(locker, args) {
		this.client.reply(locker, args);
	}
}

export default Room;
