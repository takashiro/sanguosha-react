
import React from 'react';

import Photo from '../Photo';

import './index.scss';

class PhotoLayout extends React.Component {
	constructor(props) {
		super(props);

		const { room } = this.props;

		this.state = {
			selectable: false,
			players: room.getOtherPlayers(),
		};

		room.on('playerChanged', () => {
			this.setState({ players: room.getOtherPlayers() });
		});
	}

	render() {
		const { selectable } = this.state;
		const { players } = this.state;

		const classNames = ['photo-layout', `n${players.length}`];
		if (selectable) {
			classNames.push('selectable');
		}
		return (
			<div className={classNames.join(' ')}>
				{players.map((player) => <Photo key={player.getSeat()} player={player} />)}
			</div>
		);
	}
}

export default PhotoLayout;
