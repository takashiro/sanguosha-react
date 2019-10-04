
import React from 'react';

import MovableCard from '../../component/MovableCard';

function onCardLeave(motions) {
	const {top, left} = this.node.current.getBoundingClientRect();
	motions.setStartState({
		top,
		left,
		opacity: 0,
	});

	const { area } = this.props;
	this.setState({
		num: area.size(),
	});
}

function cleanCardMotions() {
	const { area } = this.props;
	this.setState(function (prev) {
		const { motions } = prev;
		const num = area.size();
		return {
			num,
			motions: motions.filter(motion => motion.isValid()),
		};
	});
}

function onCardEnter(motions) {
	const {top, left} = this.node.current.getBoundingClientRect();
	motions.setEndState({
		top,
		left,
		opacity: 1,
	});
	motions.moveBy({
		top: -top,
		left: -left,
	});

	for (const motion of motions.children()) {
		motion.once('destroyed', this.cleanCardMotions);
	}

	this.setState(function (prev) {
		return {
			motions: [
				...prev.motions,
				...motions.children(),
			],
		};
	});
}

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;

		this.node = React.createRef();
		this.state = {
			num: area.size(),
			motions: [],
		};

		this.onCardEnter = onCardEnter.bind(this);
		this.onCardLeave = onCardLeave.bind(this);
		this.cleanCardMotions = cleanCardMotions.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardenter', this.onCardEnter);
		area.on('cardleave', this.onCardLeave);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardenter', this.onCardEnter);
		area.off('cardleave', this.onCardLeave);
	}

	render() {
		const { motions } = this.state;

		return <div ref={this.node} className="hand-area">
			<div className="card-num">{this.state.num}</div>
			{motions.map(motion => <MovableCard key={motion.id()} motion={motion} />)}
		</div>;
	}

}

export default HandArea;
