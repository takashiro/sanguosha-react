
import React from 'react';

import MovableCard from '../../component/MovableCard';

import './index.scss';

function getCardPos(index, cardWidth) {
	return {
		top: 10,
		left: 20 + index * (cardWidth + 5),
		opacity: 1,
	};
}

function onCardEntering(motion) {
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
			m.setEndState(getCardPos(i, m.width()));
		}

		return { cards };
	});
}

function repositionCards(cards) {
	cards.forEach(function (card, i) {
		card.goTo(getCardPos(i, card.width()));
	});
}

function onCardLeaving(motion) {
	const offset = this.node.current.getBoundingClientRect();

	this.setState(function (prev) {
		for (const m of motion.cards()) {
			const p = prev.cards.find((c) => c.equals(m));
			m.setStartState(p.endState());
			m.moveBy(offset);
			m.moveBy({
				top: m.height() / 2 - 20,
				left: m.width() / 2,
			});

			p.destroy();
		}

		const cards = prev.cards.filter((card) => card.isValid());
		return { cards };
	}, () => {
		const { cards } = this.state;
		repositionCards(cards);
	});
}

function onCardEnabled(enabled) {
	const { onSelectionChanged } = this.props;

	this.setState(function (prev) {
		const { cards } = prev;
		if (!enabled) {
			for (const card of cards) {
				card.setSelected(false);
			}
			if (onSelectionChanged) {
				onSelectionChanged([]);
			}
		}
		return {
			selectable: enabled,
			cards,
		};
	});
}

function onCardClicked() {
	const { onSelectionChanged } = this.props;
	if (onSelectionChanged) {
		const { cards } = this.state;
		const selectedCards = cards
			.filter((card) => card.isSelected())
			.map((card) => card.instance());
		onSelectionChanged(selectedCards);
	}
}

class HandArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cards: [],
			selectable: false,
		};
		this.node = React.createRef();

		this.onCardEntering = onCardEntering.bind(this);
		this.onCardLeaving = onCardLeaving.bind(this);
		this.onCardEnabled = onCardEnabled.bind(this);
		this.onCardClicked = onCardClicked.bind(this);
	}

	componentDidMount() {
		const { area } = this.props;

		area.on('cardEntering', this.onCardEntering);
		area.on('cardLeaving', this.onCardLeaving);
		area.on('enabledChanged', this.onCardEnabled);
	}

	componentWillUnmount() {
		const { area } = this.props;

		area.off('cardEntering', this.onCardEntering);
		area.off('cardLeaving', this.onCardLeaving);
		area.off('enabledChanged', this.onCardEnabled);
	}

	render() {
		const { cards } = this.state;
		const { selectable } = this.state;

		const classNames = ['hand-area'];
		if (selectable) {
			classNames.push('selectable');
		}

		return (
			<div className={classNames.join(' ')} ref={this.node}>
				{cards.map(
					(card) => (
						<MovableCard
							permanent
							key={card.id()}
							card={card}
							selectable={selectable}
							onClick={this.onCardClicked}
						/>
					),
				)}
			</div>
		);
	}
}

export default HandArea;
