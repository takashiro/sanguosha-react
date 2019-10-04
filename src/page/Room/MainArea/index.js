
import React from 'react';

import PhotoLayout from './PhotoLayout';

import locateCenterPos from '../../util/locateCenterPos';

import './index.scss';

function onCardLeaveDrawPile(motions) {
	const {top, left} = locateCenterPos(this.node.current);
	motions.setStartState({
		top,
		left,
		opacity: 0,
	});
}

function onCardEnterDrawPile(path) {
	const {top, left} = locateCenterPos(this.node.current);
	path.setEndState({
		top,
		left,
		opacity: 1,
	});
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
		drawPile.on('cardenter', onCardEnterDrawPile.bind(this));

		const discardPile = room.discardPile;
		discardPile.on('cardleave', onCardLeaveDrawPile.bind(this));
		discardPile.on('cardenter', onCardEnterDrawPile.bind(this));
	}

	render() {
		return <div ref={this.node} className="main-area">
			<PhotoLayout room={this.props.room} />
		</div>;
	}
}

export default MainArea;
