
import React from 'react';

import './index.scss';

import MainArea from './MainArea';
import Dashboard from './Dashboard';

class Room extends React.Component {

	render() {
		return <div className="room">
			<MainArea />
			<Dashboard />
		</div>;
	}

}

export default Room;
