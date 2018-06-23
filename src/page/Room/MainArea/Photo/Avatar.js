
import React from 'react';

class Avatar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const general = this.props.general || {
			avatar: 'unknown',
			name: '',
		};

		const className = 'avatar ' + this.props.position;
		const avatar = `style/general/fullphoto/${general.avatar}.png`;

		return <div className={className}>
			<img src={avatar} />
			<div className="name">{general.name}</div>
		</div>;
	}

}

export default Avatar;
