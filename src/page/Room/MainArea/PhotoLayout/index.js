
import React from 'react';

import Photo from '../Photo';

import './index.scss';

function onSelectableChanged(selectable) {
	this.setState({ selectable });
}

function onPlayersChanged() {
	const { room } = this.props;
	this.setState({ players: room.getOtherPlayers() });
}

class PhotoLayout extends React.Component {
	constructor(props) {
		super(props);

		const { room } = this.props;

		this.state = {
			selectable: false,
			players: room.getOtherPlayers(),
		};

		this.onSelectableChanged = onSelectableChanged.bind(this);
		this.onPlayersChanged = onPlayersChanged.bind(this);
	}

	componentDidMount() {
		const { room } = this.props;
		room.on('selectableChanged', this.onSelectableChanged);
		room.on('playersChanged', this.onPlayersChanged);
	}

	componentWillUnmount() {
		const { room } = this.props;
		room.off('selectableChanged', this.onSelectableChanged);
		room.off('playersChanged', this.onPlayersChanged);
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
