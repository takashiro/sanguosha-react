
import React from 'react';

import './index.scss';

class KingdomIcon extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { kingdom } = this.props;
		kingdom = kingdom ? kingdom.toLowerCase() : 'unknown';
		const style = {
			backgroundImage: `url('style/kingdom/${kingdom}.png')`,
		};
		return (
			<i className="kingdom" style={style} />
		);
	}
}

export default KingdomIcon;
