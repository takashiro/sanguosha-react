
import React from 'react';

class Avatar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const general = this.props.general;
		const avatar = (general && general.name) || 'unknown';
		const name = ''; //TODO: translate

		const className = 'avatar ' + this.props.position;
		return <div className={className}>
			<img src={`style/general/fullphoto/${avatar}.png`} />
			<div className="name">{name}</div>
		</div>;
	}

}

export default Avatar;
