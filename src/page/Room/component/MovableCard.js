import React from 'react';

import Movable from './Movable';
import Card from './Card';

class MovableCard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { motion } = this.props;
		const { permanent } = this.props;

		const from = motion.startState();
		const to = motion.endState();
		const card = motion.card();
		const onEnd = permanent ? null : () => motion.destroy();

		return <Movable from={from} to={to} onEnd={onEnd}>
			<Card card={card} />
		</Movable>;
	}

}

export default MovableCard;
