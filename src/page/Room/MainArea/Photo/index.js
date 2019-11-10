
import React from 'react';

import './index.scss';

import KingdomIcon from '../../component/KingdomIcon';
import HpBar from '../../component/HpBar';
import PhotoAvatar from './Avatar';
import HandArea from './HandArea';
import SeatNumber from './SeatNumber';
import PhaseBar from '../../component/PhaseBar';

function handleClick() {
	const { player } = this.props;
	if (player.isSelectable()) {
		player.setSelected(!player.isSelected());
	}
}

function handleKeyPress() {
	// TO-DO:
}

class Photo extends React.Component {
	constructor(props) {
		super(props);

		const { player } = this.props;

		this.state = {
			generalNum: 1,
			seat: player.getSeat(),
			headGeneral: player.getHeadGeneral(),
			deputyGeneral: player.getDeputyGeneral(),
			screenName: player.getName(),
			hp: player.getHp(),
			maxHp: player.getMaxHp(),
			kingdom: player.getKingdom(),
			selectable: false,
			selected: false,
		};

		this.onSeatChanged = (seat) => this.setState({ seat });
		this.onHeadGeneralChanged = (general) => this.setState({ headGeneral: general });
		this.onDeputyGeneralChanged = (general) => this.setState({ deputyGeneral: general });
		this.onNameChanged = (name) => this.setState({ screenName: name });
		this.onHpChanged = (hp) => this.setState({ hp });
		this.onMaxHpChanged = (maxHp) => this.setState({ maxHp });
		this.onKingdomChanged = (kingdom) => this.setState({ kingdom });
		this.onSelectableChanged = (selectable) => this.setState({ selectable });
		this.onSelectedChanged = (selected) => this.setState({ selected });

		this.handleClick = handleClick.bind(this);
		this.handleKeyPress = handleKeyPress.bind(this);
	}

	componentDidMount() {
		const { player } = this.props;
		player.on('seatChanged', this.onSeatChanged);
		player.on('headGeneralChanged', this.onHeadGeneralChanged);
		player.on('deputyGeneralChanged', this.onDeputyGeneralChanged);
		player.on('nameChanged', this.onNameChanged);
		player.on('hpChanged', this.onHpChanged);
		player.on('maxHpChanged', this.onMaxHpChanged);
		player.on('kingdomChanged', this.onKingdomChanged);
		player.on('selectableChanged', this.onSelectableChanged);
		player.on('selectedChanged', this.onSelectedChanged);
	}

	componentWillUnmount() {
		const { player } = this.props;
		player.off('seatChanged', this.onSeatChanged);
		player.off('headGeneralChanged', this.onHeadGeneralChanged);
		player.off('deputyGeneralChanged', this.onDeputyGeneralChanged);
		player.off('nameChanged', this.onNameChanged);
		player.off('hpChanged', this.onHpChanged);
		player.off('maxHpChanged', this.onMaxHpChanged);
		player.off('kingdomChanged', this.onKingdomChanged);
		player.off('selectableChanged', this.onSelectableChanged);
		player.off('selectedChanged', this.onSelectedChanged);
	}

	render() {
		const { player } = this.props;
		const { kingdom } = this.state;
		const { generalNum } = this.state;
		const { headGeneral } = this.state;
		const { deputyGeneral } = this.state;
		const { screenName } = this.state;
		const { hp, maxHp } = this.state;
		const { seat } = this.state;
		const { selectable, selected } = this.state;

		const classNames = ['photo', kingdom ? kingdom.toLowerCase() : 'unknown'];
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
				<HpBar size={18} hp={hp} maxHp={maxHp} />
				<SeatNumber number={seat} />
				<PhaseBar player={player} />
				<HandArea area={player.handArea} />
			</div>
		);
	}
}

export default Photo;
