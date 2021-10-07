import React from 'react';

import MovableCard from '../../component/MovableCard';

import './index.scss';
import Card from '../../../../game/MovableCard';
import CardArea from '../../../../game/CardArea';
import CardMotion from '../../../../game/CardMotion';
import MotionState from '../../../../game/MotionState';

function getCardPos(index: number, cardWidth: number): MotionState {
	return {
		top: 10,
		left: 20 + index * (cardWidth + 5),
		opacity: 1,
	};
}

function repositionCards(cards: Card[]): void {
	cards.forEach((card, i) => {
		card.goTo(getCardPos(i, card.getWidth()));
	});
}

interface AreaProps {
	area: CardArea;
}

interface AreaState {
	cards: Card[];
	selectable: boolean;
}

class HandArea extends React.Component<AreaProps, AreaState> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: AreaProps) {
		super(props);

		this.state = {
			cards: [],
			selectable: false,
		};
		this.node = React.createRef();
	}

	componentDidMount(): void {
		const { area } = this.props;

		area.on('enabledChanged', this.onEnabled);
		area.on('selectableCardsChanged', this.onSelectableCardsChanged);
		area.on('cardEntering', this.onCardEntering);
		area.on('cardLeaving', this.onCardLeaving);
	}

	componentWillUnmount(): void {
		const { area } = this.props;

		area.off('enabledChanged', this.onEnabled);
		area.off('selectableCardsChanged', this.onSelectableCardsChanged);
		area.off('cardEntering', this.onCardEntering);
		area.off('cardLeaving', this.onCardLeaving);
	}

	onEnabled = (enabled: boolean): void => {
		this.setState({
			selectable: enabled,
		});
	}

	onSelectableCardsChanged = (selectableCards: number[]): void => {
		this.setState((prev) => {
			const { cards } = prev;
			for (const card of cards) {
				const selectable = selectableCards.includes(card.getId());
				card.setSelectable(selectable);
				if (!selectable) {
					card.setSelected(false);
				}
			}
		});
	}

	onCardEntering = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}

		const origin = this.node.current.getBoundingClientRect();
		const offset = {
			top: -origin.top,
			left: -origin.left,
		};

		this.setState((prev) => {
			const cards = [
				...prev.cards,
				...motion.getCards(),
			];

			for (let i = prev.cards.length; i < cards.length; i++) {
				const m = cards[i];
				m.moveBy(offset);
				m.moveBy({
					top: -m.getWidth() / 2,
					left: -m.getHeight() / 2,
				});
				m.setEndState(getCardPos(i, m.getWidth()));
			}

			return { cards };
		});
	}

	onCardLeaving = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}
		const offset = this.node.current.getBoundingClientRect();

		this.setState((prev) => {
			for (const m of motion.getCards()) {
				const p = prev.cards.find((c) => c.equals(m));
				if (!p) {
					continue;
				}

				m.setStartState(p.getEndState());
				m.moveBy(offset);
				m.moveBy({
					top: m.getHeight() / 2 - 20,
					left: m.getWidth() / 2,
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

	onCardClicked = (): void => {
		const { area } = this.props;
		const { cards } = this.state;
		const selectedCards = cards
			.filter((card) => card.isSelected())
			.map((card) => card.getId());
		area.setSelectedCards(selectedCards);
	}

	render(): JSX.Element {
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
							key={card.getSerial()}
							card={card}
							onClick={this.onCardClicked}
						/>
					),
				)}
			</div>
		);
	}
}

export default HandArea;
