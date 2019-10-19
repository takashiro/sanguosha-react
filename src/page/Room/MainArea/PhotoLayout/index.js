
import React from 'react';

import Photo from '../Photo';

import './index.scss';

class PhotoLayout extends React.Component {
	constructor(props) {
		super(props);

		const { room } = this.props;

		this.state = {
			players: room.otherPlayers(),
		};

		room.on('playerChanged', () => {
			this.setState({ players: room.otherPlayers() });
		});
	}

	render() {
		const { players } = this.state;
		return (
			<div className={`photo-layout n${players.length}`}>
				{players.map((player, i) => <Photo key={i} player={player} />)}
			</div>
		);
	}
}

export default PhotoLayout;
