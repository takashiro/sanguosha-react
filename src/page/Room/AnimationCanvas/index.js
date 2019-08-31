
import React from 'react';

import AnimatedCard from './AnimatedCard';

import './index.scss';

function cleanCardMotions() {
	this.setState(function (prev) {
		const cardMotions = prev.cardMotions.filter(motion => motion.isValid());
		return {cardMotions};
	});
}

function onCardMove(motionGroup) {
	motionGroup.on('destroyed', this.cleanCardMotions);

	this.setState(function (prev) {
		const motions = motionGroup.children();
		const cardMotions = [...prev.cardMotions, ...motions];
		return {cardMotions};
	});
}

class AnimationCanvas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cardMotions: []
		};

		const room = props.room;
		room.on('cardmove', onCardMove.bind(this));

		this.cleanCardMotions = cleanCardMotions.bind(this);
	}

	render() {
		const cardMotions = this.state.cardMotions.filter(motion => motion.card());
		return <div className="animation-canvas">
			{cardMotions.map(motion => (
				<AnimatedCard
					key={`card-${motion.card().key()}`}
					motion={motion}
				/>
			))}
		</div>;
	}

}

export default AnimationCanvas;
