
import React from 'react';

import PhotoLayout from './PhotoLayout';

import './index.scss';

class MainArea extends React.Component {
	constructor(props) {
		super(props);

		this.node = React.createRef();
	}

	render() {
		const { room } = this.props;
		return (
			<div ref={this.node} className="main-area">
				<PhotoLayout room={room} />
			</div>
		);
	}
}

export default MainArea;
