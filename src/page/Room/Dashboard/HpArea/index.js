
import React from 'react';

import HpBar from '../../component/HpBar';

import './index.scss';

function HpArea(props) {
	const { player } = props;
	return (
		<div className="hp-area">
			<HpBar
				size="24"
				player={player}
			/>
		</div>
	);
}

export default HpArea;
