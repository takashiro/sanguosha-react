
import React from 'react';

import './index.scss';

class GeneralAvatar extends React.Component {
	constructor(props) {
		super(props);

		const { general } = props;

		this.state = {
			position: props.position || 'head',
			name: '', // TODO: translate
			kingdom: general && general.kingdom || 'unknown',
			avatar: general && general.name || 'unknown',
		};
	}

	render() {
		const className = `general-avatar ${this.state.kingdom} ${this.state.position}`;
		const avatar = `style/general/fullphoto/${this.state.avatar}.png`;
		return (
			<div className={className}>
				<img className="avatar" src={avatar} />
				<div className="frame" />
				<div className="name">{this.state.name}</div>
			</div>
		);
	}
}

export default GeneralAvatar;
