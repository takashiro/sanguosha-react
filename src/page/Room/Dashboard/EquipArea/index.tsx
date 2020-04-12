import React from 'react';

import Card from '../../../../game/Card';
import CardArea from '../../../../game/CardArea';
import CardMotion from '../../../../game/CardMotion';
import GameMovableCard from '../../../../game/MovableCard';

import MovableCard from '../../component/MovableCard';
import Equip from '../../component/Equip';

import './index.scss';

interface AreaProps {
	area: CardArea;
}

// TO-DO: Check and map card subtype
interface State {
	animations: GameMovableCard[];
	equips: Card[];
}

class EquipArea extends React.Component<AreaProps, State> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: AreaProps) {
		super(props);

		this.state = {
			animations: [],
			equips: [],
		};

		this.node = React.createRef();
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

		const {
			top,
			left,
			bottom,
			right,
		} = this.node.current.getBoundingClientRect();

		motion.setEndState({
			top: (top + bottom) / 2,
			left: (left + right) / 2,
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
				equips: cards,
				animations: animations.filter((animation) => animation.isValid()),
			};
		});
	}

	render(): JSX.Element {
		const { equips } = this.state;
		const { animations } = this.state;

		const emptyBars = new Array(5 - equips.length);
		for (let i = 0; i < emptyBars.length; i++) {
			emptyBars[i] = i;
		}
		return (
			<div className="equip-area" ref={this.node}>
				<ul className="equips">
					{equips.map((equip) => (
						<li key={equip.getKey()}>
							<Equip card={equip} />
						</li>
					))}
					{emptyBars.map((key) => <li key={key} />)}
				</ul>
				{animations.map((animation) => <MovableCard key={animation.getSerial()} card={animation} />)}
			</div>
		);
	}
}

export default EquipArea;
