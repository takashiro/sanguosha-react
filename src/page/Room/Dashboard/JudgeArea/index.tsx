import React from 'react';

import Card from '../../../../game/Card';
import CardArea from '../../../../game/CardArea';
import CardMotion from '../../../../game/CardMotion';
import GameMovableCard from '../../../../game/MovableCard';

import CardIcon from '../../component/CardIcon';
import MovableCard from '../../component/MovableCard';

import './index.scss';

interface AreaProps {
	area: CardArea;
}

interface AreaState {
	animations: GameMovableCard[];
	cards: Card[];
}

class JudgeArea extends React.Component<AreaProps, AreaState> {
	node: React.RefObject<HTMLDivElement>;

	constructor(props: AreaProps) {
		super(props);

		this.node = React.createRef();
		this.state = {
			animations: [],
			cards: [],
		};
	}

	componentDidMount(): void {
		const { area } = this.props;

		area.on('cardEntering', this.onCardEntering);
		area.on('cardLeaving', this.onCardLeaving);
	}

	componentWillUnmount(): void {
		const { area } = this.props;

		area.off('cardEntering', this.onCardEntering);
		area.off('cardLeaving', this.onCardLeaving);
	}

	onCardLeaving = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}

		const { top, left } = this.node.current.getBoundingClientRect();
		motion.setStartState({
			top,
			left,
			opacity: 0,
		});
	}

	onCardEntering = (motion: CardMotion): void => {
		if (!this.node.current) {
			return;
		}

		const { top, left } = this.node.current.getBoundingClientRect();
		motion.setEndState({
			top,
			left,
			opacity: 1,
		});
		motion.moveBy({
			top: -top,
			left: -left,
		});

		for (const card of motion.getCards()) {
			card.once('destroyed', this.cleanCards);
		}

		this.setState((prev) => ({
			animations: [
				...prev.animations,
				...motion.getCards(),
			],
		}));
	}

	cleanCards = (): void => {
		const { area } = this.props;
		this.setState((prev) => {
			const { animations } = prev;
			const cards = area.getCards();
			return {
				cards,
				animations: animations.filter((animation) => animation.isValid()),
			};
		});
	}

	render(): JSX.Element {
		const { cards } = this.state;
		const { animations } = this.state;

		return (
			<div ref={this.node} className="judge-area">
				{cards.map((card) => <CardIcon key={card.getId()} card={card} />)}
				{animations.map((animation) => <MovableCard key={animation.getSerial()} card={animation} />)}
			</div>
		);
	}
}

export default JudgeArea;
