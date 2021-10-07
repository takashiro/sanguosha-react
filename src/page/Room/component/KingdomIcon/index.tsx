import React from 'react';

import { Kingdom } from '@karuta/sanguosha-core';

import './index.scss';

interface Props {
	kingdom: Kingdom;
}

function KingdomIcon(props: Props): JSX.Element {
	const { kingdom } = props;
	const icon = kingdom ? Kingdom[kingdom].toLowerCase() : 'unknown';
	const style = {
		backgroundImage: `url('style/kingdom/${icon}.png')`,
	};
	return (
		<i className="kingdom" style={style} />
	);
}

export default KingdomIcon;
