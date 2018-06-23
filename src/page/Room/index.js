
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';

class Room extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div className="room">
			<MainArea room={this.props.room} />
			<Dashboard room={this.props.room} />
		</div>;
	}

}

export default Room;
