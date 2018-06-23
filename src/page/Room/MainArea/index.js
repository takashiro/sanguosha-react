
import React from 'react';

import PhotoLayout from './PhotoLayout';

import './index.scss';

class MainArea extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div className="main-area">
			<PhotoLayout room={this.props.room} />
		</div>;
	}
}

export default MainArea;
