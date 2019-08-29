
import React from 'react';

import AnimatedCard from './AnimatedCard';

import './index.scss';

function onCardMove(path) {
	const cards = path.cards();

	const cardNum = cards.length;
	const midIndex = Math.floor(cardNum / 2);

	const cardPaths = !path.isCustomized() ? cards.map(function (card, index) {
		const p = {
			parent: path,
			from: {...path.startPos()},
			to: {...path.endPos()},
			card,
		};

		if (index !== midIndex) {
			p.from.left += 30 * (index - midIndex);
			p.to.left += 30 * (index - midIndex);
		}

		return p;
	}) : path.children().map(function (subpath) {
		return {
			parent: path,
			from: {...subpath.startPos()},
			to: {...subpath.endPos()},
			card: subpath.card(),
		};
	});

	this.setState(function (prev) {
		prev.cardPaths.push(...cardPaths);
		return {cardPaths: prev.cardPaths};
	});
}

function onCardExited(card) {
	this.setState(function (prev) {
		const paths = prev.cardPaths;
		for (let i = 0; i < paths.length; i++) {
			const path = paths[i];
			if (card === path.card) {
				paths.splice(i, 1);
				path.parent.destroy();
				break;
			}
		}
		return {cardPaths:  paths};
	});
}

class AnimationCanvas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cardPaths: []
		};

		const room = props.room;
		room.on('cardmove', onCardMove.bind(this));

		this.onCardExited = onCardExited.bind(this);
	}

	render() {
		const cardPaths = this.state.cardPaths;
		return <div className="animation-canvas">
			{cardPaths.map(path => (
				<AnimatedCard
					key={`card-${path.card.key()}`}
					card={path.card}
					path={path}
					onExited={this.onCardExited}
				/>
			))}
		</div>;
	}

}

export default AnimationCanvas;
