import React from 'react';

import Movable from './Movable';
import Card from './Card';

function updatePos() {
	const { card } = this.props;
	this.setState({
		from: card.startState(),
		to: card.endState(),
	});
}

class MovableCard extends React.Component {

	constructor(props) {
		super(props);

		const { card } = props;
		this.state = {
			from: card.startState(),
			to: card.endState(),
		};
	}

	componentDidMount() {
		const { permanent } = this.props;
		if (permanent) {
			const { card } = this.props;
			this.updatePos = updatePos.bind(this);
			card.on('move', this.updatePos);
		}
	}

	componentWillUnmount() {
		if (this.updatePos) {
			const { card } = this.props;
			card.off('move', this.updatePos);
			this.updatePos = null;
		}
	}

	render() {
		const { card } = this.props;
		const { permanent } = this.props;

		const { from, to } = this.state;
		const onEnd = permanent ? null : () => card.destroy();

		return <Movable from={from} to={to} onEnd={onEnd}>
			<Card card={card.instance()} />
		</Movable>;
	}

}

export default MovableCard;
