
import React from 'react';

import './index.scss';

class GeneralAvatar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			position: props.position ? props.position : 'head',
			name: props.name ? props.name : '',
			kingdom: props.kingdom ? props.kingdom : 'god',
			avatar: props.avatar ? props.avatar : 'unknown',
		};
	}

	render() {
		let className = `general-avatar ${this.state.kingdom} ${this.state.position}`;
		let avatar = `style/general/fullphoto/${this.state.avatar}.png`;
		return <div className={className}>
			<img className="avatar" src={avatar} />
			<div className="frame"></div>
			<div className="name">{this.state.name}</div>
		</div>;
	}

}

export default GeneralAvatar;
