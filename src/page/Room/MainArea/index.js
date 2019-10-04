
import React from 'react';

import PhotoLayout from './PhotoLayout';
import DiscardPile from './DiscardPile';

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
	}

	render() {
		const room = this.props.room;

		return <div ref={this.node} className="main-area">
			<PhotoLayout room={this.props.room} />
			<DiscardPile area={room.discardPile} />
		</div>;
	}
}

export default MainArea;
