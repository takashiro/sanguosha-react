
import React from 'react';

import './index.scss';

class GeneralAvatar extends React.Component {

	constructor(props) {
		super(props);

		const general = props.general;

		this.state = {
			position: props.position || 'head',
			name: general && general.name || '',
			kingdom: general && general.kingdom || 'unknown',
			avatar: general && general.avatar || 'unknown',
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
