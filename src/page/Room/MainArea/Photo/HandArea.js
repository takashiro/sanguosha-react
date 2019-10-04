
import React from 'react';

import locateCenterPos from '../../../util/locateCenterPos';

function onCardEnter(motion) {
	const {top, left} = locateCenterPos(this.node.current.parentElement);
	motion.setEndPos(top, left);
}

function onCardLeave(motion) {
	const {top, left} = locateCenterPos(this.node.current.parentElement);
	motion.setStartPos(top, left);
}

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;

		this.node = React.createRef();
		this.state = {
			num: area.size(),
		};
	}

	componentDidMount() {
		const { area } = this.props;
		//area.on('cardenter', onCardEnter.bind(this));
		//area.on('cardleave', onCardLeave.bind(this));
		area.on('numchanged', num => this.setState({num}));
	}

	render() {
		return <div ref={this.node} className="hand-area">
			<div className="card-num">{this.state.num}</div>
		</div>;
	}

}

export default HandArea;
