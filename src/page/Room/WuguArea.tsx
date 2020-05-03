import React from 'react';

import Card from '../../game/MovableCard';
import CardArea from '../../game/CardArea';
import CardMotion from '../../game/CardMotion';

import FloatBox from './component/FloatBox';
import MovableCard from './component/MovableCard';
import locateCenterPos from '../util/locateCenterPos';

import './WuguArea.scss';

interface AreaProps {
	area: CardArea;
}

interface AreaState {
	visible: boolean;
	cards: Card[];
}

export default class WuguArea extends React.Component<AreaProps, AreaState> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: AreaProps) {
		super(props);

		this.state = {
			visible: false,
			cards: [],
		};

		this.node = React.createRef();
	}

	componentDidMount(): void {
		const { area } = this.props;
		area.on('cardEntering', this.addCards);
		area.on('cardLeaving', this.removeCards);
	}

	componentWillUnmount(): void {
		const { area } = this.props;
		area.on('cardEntering', this.addCards);
		area.on('cardLeaving', this.removeCards);
	}

	addCards = (motion: CardMotion): void => {
		const cardState = { top: 0, left: 0, opacity: 1 };
		motion.setStartState(cardState);
		motion.setEndState(cardState);

		const cards = motion.getCards();
		for (const card of cards) {
			card.setSelectable(true);
		}

		this.setState((prev) => ({
			visible: true,
			cards: [...prev.cards, ...cards],
		}));
	}

	removeCards = (motion: CardMotion): void => {
		this.setState((prev) => {
			const { cards } = prev;
			for (const removed of motion.getCards()) {
				const candidate = cards.find((card) => card.equals(removed));
				if (candidate) {
					candidate.setSelectable(false);
					const index = cards.indexOf(candidate);
					const card = this.findCardByIndex(index);
					if (card) {
						removed.setStartState({
							...locateCenterPos(card),
							opacity: 1,
						});
					}
				}
			}

			const visible = cards.some((card) => card.isSelectable());
			return {
				visible,
				cards: visible ? cards : [],
			};
		});
	}

	handleCardClick = (card: Card): void => {
		const { area } = this.props;
		if (!area.isEnabled()) {
			return;
		}

		area.setSelectedCards([card.getId()]);
	}

	findCardByIndex(index: number): Element | null {
		const list = this.node.current;
		if (!list) {
			return null;
		}

		return list.children[index];
	}

	render(): JSX.Element | null {
		const { visible } = this.state;
		if (!visible) {
			return null;
		}

		const {
			cards,
		} = this.state;

		if (cards.length <= 0) {
			return null;
		}

		const cardWidth = cards[0].getWidth();
		const gap = 4;
		const lineSize = cards.length <= 6 ? cards.length : cards.length / 2;
		const style = {
			width: cardWidth * lineSize + gap * (lineSize + 1),
		};

		return (
			<FloatBox className="wugu-area">
				<h4>五谷丰登</h4>
				<div className="content card-list" style={style} ref={this.node}>
					{cards.map((card) => (
						<MovableCard
							key={card.getSerial()}
							card={card}
							permanent
							onClick={this.handleCardClick}
						/>
					))}
				</div>
			</FloatBox>
		);
	}
}
