
import React from 'react';

import './index.scss';

class KingdomIcon extends React.Component {

	constructor(props) {
		super();

		this.state = {
			kingdom: props.kingdom ? props.kingdom : 'unknown',
		};
	}

	render() {
		let style = {
			backgroundImage: `url('style/kingdom/${this.state.kingdom}.png')`,
		};
		return <i className="kingdom" style={style}>
		</i>;
	}

}

export default KingdomIcon;
