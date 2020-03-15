
import React from 'react';

import Photo from '../Photo';

import Room from '../../../../game/Room';
import Player from '../../../../game/Player';

import './index.scss';

interface LayoutProps {
	room: Room;
}

interface LayoutState {
	selectable: boolean;
	players: Player[];
}

class PhotoLayout extends React.Component<LayoutProps, LayoutState> {
	constructor(props: LayoutProps) {
		super(props);

		const { room } = this.props;

		this.state = {
			selectable: false,
			players: room.getOtherPlayers(),
		};
	}

	componentDidMount(): void {
		const { room } = this.props;
		room.on('selectableChanged', this.onSelectableChanged);
		room.on('playersChanged', this.onPlayersChanged);
	}

	componentWillUnmount(): void {
		const { room } = this.props;
		room.off('selectableChanged', this.onSelectableChanged);
		room.off('playersChanged', this.onPlayersChanged);
	}

	onSelectableChanged = (selectable: boolean): void => {
		this.setState({ selectable });
	}

	onPlayersChanged = (): void => {
		const { room } = this.props;
		this.setState({ players: room.getOtherPlayers() });
	}

	render(): JSX.Element {
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
