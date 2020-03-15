import { Command } from '@karuta/sanguosha-core';

import ActionConnector from '../ActionConnector';

import Room from '../Room';
import Player from '../../Player';
import DashboardPlayer from '../DashboardPlayer';
import RoomPlayer from '../RoomPlayer';

function sortPlayerSeat(players: Player[], dashboardUid: number): void {
	const dashboardPlayer = players.find((player) => player.getUid() === dashboardUid);
	if (!dashboardPlayer) {
		return;
	}

	const dashboardSeat = dashboardPlayer.getSeat();
	const playerNum = players.length;

	function getRelativeSeat(player: Player): number {
		let seat = player.getSeat() - dashboardSeat;
		if (seat < 0) {
			seat += playerNum;
		}
		return seat;
	}

	players.sort((a, b) => {
		const p = getRelativeSeat(a);
		const q = getRelativeSeat(b);
		return p - q;
	});
}

interface PlayerMeta {
	uid: number;
	seat: number;
	name: string;
}

export default class ArrangeSeats extends ActionConnector<PlayerMeta[]> {
	constructor() {
		super(Command.ArrangeSeats);
	}

	proceed(room: Room, metas: PlayerMeta[]): void {
		const dashboard = room.getDashboard();

		const players: Player[] = new Array(metas.length);
		for (let i = 0; i < metas.length; i++) {
			const meta = metas[i];
			if (meta.uid === room.getDashboardUid()) {
				const player = new DashboardPlayer(meta.uid, meta.seat, meta.name);
				players[i] = player;
				dashboard.setPlayer(player);
			} else {
				const player = new RoomPlayer(meta.uid, meta.seat, meta.name);
				players[i] = player;
			}
		}

		sortPlayerSeat(players, dashboard.getUid());
		room.setPlayers(players);
	}
}
