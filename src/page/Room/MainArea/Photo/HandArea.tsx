import React from 'react';

import MovableCard from '../../component/MovableCard';

import Card from '../../../../game/MovableCard';
import CardArea from '../../../../game/CardArea';
import CardMotion from '../../../../game/CardMotion';

interface AreaProps {
	area: CardArea;
}

interface AreaState {
	num: number;
	cards: Card[];
}

class HandArea extends React.Component<AreaProps, AreaState> {
	node: React.RefObject<HTMLDivElement>;

	constructor(props: AreaProps) {
		super(props);

		const { area } = props;

		this.node = React.createRef();
		this.state = {
			num: area.size,
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

		const { area } = this.props;
		this.setState({
			num: area.size,
		});
	}

	cleanCards = (): void => {
		const { area } = this.props;
		this.setState((prev) => {
			const { cards } = prev;
			const num = area.size;
			return {
				num,
				cards: cards.filter((motion) => motion.isValid()),
			};
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
			cards: [
				...prev.cards,
				...motion.getCards(),
			],
		}));
	}

	render(): JSX.Element {
		const { cards } = this.state;
		const { num } = this.state;

		return (
			<div ref={this.node} className="hand-area">
				<div className="card-num">{num}</div>
				{cards.map((card) => <MovableCard key={card.getSerial()} card={card} />)}
			</div>
		);
	}
}

export default HandArea;
