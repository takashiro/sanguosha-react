
import React from 'react';

import AnimatedCard from './AnimatedCard';

import './index.scss';

function onCardMove(path) {
	const cards = path.cards();

	const cardNum = cards.length;
	const midIndex = Math.floor(cardNum / 2);

	const cardPaths = cards.map(function (card, index) {
		const p = {
			from: {...path.start()},
			to: {...path.end()},
			card,
		};

		if (index !== midIndex) {
			p.from.left += 30 * (index - midIndex);
			p.to.left += 30 * (index - midIndex);
		}

		return p;
	});

	this.setState(function (prev) {
		prev.cardPaths.push(...cardPaths);
		return {cardPaths: prev.cardPaths};
	});
}

function onAnimationEnd(card) {
	this.setState(function (prev) {
		const paths = prev.cardPaths;
		for (let i = 0; i < paths.length; i++) {
			if (card === paths[i].card) {
				paths.splice(i, 1);
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
	}

	render() {
		const cardPaths = this.state.cardPaths;
		return <div className="animation-canvas">
			{cardPaths.map(path => (
				<AnimatedCard key={`card-${path.card.key()}`} card={path.card} path={path} out={onAnimationEnd.bind(this)} />
			))}
		</div>;
	}

}

export default AnimationCanvas;
