
import React from 'react';

import MovableCard from '../../component/MovableCard';

import './index.scss';

function onCardEnter(motion) {
	const origin = this.node.current.getBoundingClientRect();
	const offset = {
		top: -origin.top,
		left: -origin.left,
	};

	this.setState(function (prev) {
		const cards = [
			...prev.cards,
			...motion.cards(),
		];

		for (let i = prev.cards.length; i < cards.length; i++) {
			const m = cards[i];
			m.moveBy(offset);
			m.moveBy({
				top: -m.width() / 2,
				left: -m.height() / 2,
			});
			m.setEndState({
				top: 10,
				left: i * (m.width() + 5),
				opacity: 1,
			});
		}

		const cardNum = cards.length;
		return {
			cardNum,
			cards,
		};
	});
}

function onCardLeave(motion) {
	const offset = this.node.current.getBoundingClientRect();

	this.setState(function (prev) {
		for (const m of motion.cards()) {
			const p = prev.cards.find(p => p.equals(m));
			m.setStartState(p.endState());
			m.moveBy(offset);
			m.moveBy({
				top: m.width() / 2,
				left: m.height() / 2,
			});

			p.destroy();
		}

		const cards = prev.cards.filter(card => card.isValid());
		return {
			cardNum: cards.length,
			cards,
		};
	});
}

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cards: [],
			cardNum: 0,
			selectable: false,
			cardExp: null,
		};
		this.node = React.createRef();

		this.onCardEnter = onCardEnter.bind(this);
		this.onCardLeave = onCardLeave.bind(this);
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
		const { cards } = this.state;

		const classNames = ['hand-area'];
		if (this.state.selectable) {
			classNames.push('selectable');
		}

		return <div className={classNames.join(' ')} ref={this.node}>
			{cards.map(
				card => <MovableCard
					permanent={true}
					key={card.id()}
					card={card}
				/>
			)}
		</div>;
	}

}

export default HandArea;
