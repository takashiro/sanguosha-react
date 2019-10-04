
import React from 'react';

import PhotoLayout from './PhotoLayout';

import './index.scss';

class MainArea extends React.Component {

	constructor(props) {
		super(props);

		this.node = React.createRef();
	}

	render() {
		return <div ref={this.node} className="main-area">
			<PhotoLayout room={this.props.room} />
		</div>;
	}
}

export default MainArea;
