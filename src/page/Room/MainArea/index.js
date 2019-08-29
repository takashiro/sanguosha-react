
import React from 'react';

import PhotoLayout from './PhotoLayout';

import './index.scss';

function onCardLeaveDrawPile(path) {
	const rect = this.node.current.getBoundingClientRect();
	const left = (rect.left + rect.right) / 2;
	const top = (rect.top + rect.bottom) / 2;
	path.setStartPos(top, left);
}

class MainArea extends React.Component {

	constructor(props) {
		super(props);

		this.node = React.createRef();
	}

	componentDidMount() {
		const room = this.props.room;
		const drawPile = room.drawPile;
		drawPile.on('cardleave', onCardLeaveDrawPile.bind(this));
	}

	render() {
		return <div ref={this.node} className="main-area">
			<PhotoLayout room={this.props.room} />
		</div>;
	}
}

export default MainArea;
