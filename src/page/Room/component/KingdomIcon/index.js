
import React from 'react';

import './index.scss';

function KingdomIcon(props) {
	let { kingdom } = props;
	kingdom = kingdom ? kingdom.toLowerCase() : 'unknown';
	const style = {
		backgroundImage: `url('style/kingdom/${kingdom}.png')`,
	};
	return (
		<i className="kingdom" style={style} />
	);
}

export default KingdomIcon;
