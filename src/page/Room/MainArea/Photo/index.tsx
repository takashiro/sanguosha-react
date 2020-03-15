
import React from 'react';

import {
	GeneralProfile,
	Kingdom,
} from '@karuta/sanguosha-core';

import KingdomIcon from '../../component/KingdomIcon';
import HpBar from '../../component/HpBar';
import PhotoAvatar from './Avatar';
import HandArea from './HandArea';
import SeatNumber from './SeatNumber';
import PhaseBar from '../../component/PhaseBar';

import Player from '../../../../game/Player';

import './index.scss';


interface PhotoProps {
	player: Player;
}

interface PhotoState {
	generalNum: number;
	seat: number;
	headGeneral: GeneralProfile | null;
	deputyGeneral: GeneralProfile | null;
	screenName: string;
	kingdom: Kingdom;
	selectable: boolean;
	selected: boolean;
}

class Photo extends React.Component<PhotoProps, PhotoState> {
	constructor(props: PhotoProps) {
		super(props);

		const { player } = this.props;

		this.state = {
			generalNum: 1,
			seat: player.getSeat(),
			headGeneral: player.getHeadGeneral(),
			deputyGeneral: player.getDeputyGeneral(),
			screenName: player.getName(),
			kingdom: player.getKingdom(),
			selectable: false,
			selected: false,
		};
	}

	componentDidMount(): void {
		const { player } = this.props;
		player.on('seatChanged', this.onSeatChanged);
		player.on('headGeneralChanged', this.onHeadGeneralChanged);
		player.on('deputyGeneralChanged', this.onDeputyGeneralChanged);
		player.on('nameChanged', this.onNameChanged);
		player.on('kingdomChanged', this.onKingdomChanged);
		player.on('selectableChanged', this.onSelectableChanged);
		player.on('selectedChanged', this.onSelectedChanged);
	}

	componentWillUnmount(): void {
		const { player } = this.props;
		player.off('seatChanged', this.onSeatChanged);
		player.off('headGeneralChanged', this.onHeadGeneralChanged);
		player.off('deputyGeneralChanged', this.onDeputyGeneralChanged);
		player.off('nameChanged', this.onNameChanged);
		player.off('kingdomChanged', this.onKingdomChanged);
		player.off('selectableChanged', this.onSelectableChanged);
		player.off('selectedChanged', this.onSelectedChanged);
	}

	onSeatChanged = (seat: number): void => this.setState({ seat });

	onHeadGeneralChanged = (general: GeneralProfile): void => this.setState({ headGeneral: general });

	onDeputyGeneralChanged = (general: GeneralProfile): void => this.setState({ deputyGeneral: general });

	onNameChanged = (name: string): void => this.setState({ screenName: name });

	onKingdomChanged = (kingdom: Kingdom): void => this.setState({ kingdom });

	onSelectableChanged = (selectable: boolean): void => this.setState({ selectable });

	onSelectedChanged = (selected: boolean): void => this.setState({ selected });

	handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault();
		this.toggleSelection();
	}

	handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.toggleSelection();
		}
	}

	toggleSelection(): void {
		const { player } = this.props;
		if (player.isSelectable()) {
			player.setSelected(!player.isSelected());
		}
	}

	render(): JSX.Element {
		const { player } = this.props;
		const { kingdom } = this.state;
		const { generalNum } = this.state;
		const { headGeneral } = this.state;
		const { deputyGeneral } = this.state;
		const { screenName } = this.state;
		const { seat } = this.state;
		const { selectable, selected } = this.state;

		const classNames = ['photo', kingdom ? Kingdom[kingdom].toLowerCase() : 'unknown'];
		if (selectable) {
			classNames.push('selectable');
			if (selected) {
				classNames.push('selected');
			}
		}
		return (
			<div className={classNames.join(' ')} role="button" tabIndex={0} onClick={this.handleClick} onKeyPress={this.handleKeyPress}>
				<div className={`avatar-area g${generalNum}`}>
					<PhotoAvatar
						position="head"
						general={headGeneral}
					/>
					{generalNum > 1 ? (
						<PhotoAvatar
							position="deputy"
							general={deputyGeneral}
						/>
					) : null}
				</div>
				{generalNum === 2 ? <div className="frame" /> : null}
				<div className="screen-name">{screenName}</div>
				<KingdomIcon kingdom={kingdom} />
				<HpBar size={18} player={player} />
				<SeatNumber number={seat} />
				<PhaseBar player={player} />
				<HandArea area={player.getHandArea()} />
			</div>
		);
	}
}

export default Photo;
