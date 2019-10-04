import React from 'react';
import MovableCard from '../component/MovableCard';

import './DiscardPile.scss';

function onCardEnter(motions) {
	const { top, left } = this.node.current.getBoundingClientRect();
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

function onCardLeave(motions) {
	const { top, left } = this.node.current.getBoundingClientRect();
	motions.setStartPos({
		top,
		left,
		opacity: 0,
	});
}

function cleanCardMotions() {
	this.setState(function (prev) {
		return {
			motions: prev.motions.filter(motion => motion.isValid()),
		};
	});
}

class DiscardPile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			motions: [],
		};

		this.node = React.createRef();

		this.cleanCardMotions = cleanCardMotions.bind(this);
		this.onCardEnter = onCardEnter.bind(this);
		this.onCardLeave = onCardLeave.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardleave', this.onCardLeave);
		area.on('cardenter', this.onCardEnter);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardleave', this.onCardLeave);
		area.off('cardenter', this.onCardEnter);
	}

	render() {
		const { motions } = this.state;
		return <div ref={this.node} className="discard-pile">
			{motions.map(motion => <MovableCard key={motion.id()} motion={motion} />)}
		</div>;
	}

}

export default DiscardPile;
