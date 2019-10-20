
import React from 'react';

import './index.scss';

class GeneralAvatar extends React.Component {
	constructor(props) {
		super(props);

		const { general } = props;

		this.state = {
			position: props.position || 'head',
			name: '', // TODO: translate
			kingdom: (general && general.kingdom) || 'unknown',
			avatar: (general && general.name) || 'unknown',
		};
	}

	render() {
		const {
			kingdom,
			position,
			avatar,
			name,
		} = this.state;

		const className = `general-avatar ${kingdom} ${position}`;
		return (
			<div className={className}>
				<img className="avatar" src={`style/general/fullphoto/${avatar}.png`} alt="" />
				<div className="frame" />
				<div className="name">{name}</div>
			</div>
		);
	}
}

export default GeneralAvatar;
