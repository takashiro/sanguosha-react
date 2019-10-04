import React from 'react';

import Movable from './Movable';
import Card from './Card';

class MovableCard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { card } = this.props;
		const { permanent } = this.props;

		const from = card.startState();
		const to = card.endState();
		const onEnd = permanent ? null : () => card.destroy();

		return <Movable from={from} to={to} onEnd={onEnd}>
			<Card card={card.instance()} />
		</Movable>;
	}

}

export default MovableCard;
