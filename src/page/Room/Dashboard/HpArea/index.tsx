import React from 'react';

import HpBar from '../../component/HpBar';
import Player from '../../../../game/Player';

import './index.scss';

interface HpAreaProps {
	player: Player;
}

function HpArea(props: HpAreaProps): JSX.Element {
	const { player } = props;
	return (
		<div className="hp-area">
			<HpBar
				size={24}
				player={player}
			/>
		</div>
	);
}

export default HpArea;
