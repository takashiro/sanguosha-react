import React from 'react';

import Movable from './Movable';
import Card from './Card';

import GameCard from '../../../game/MovableCard';
import MotionState from '../../../game/MotionState';

interface Props {
	card: GameCard;
	permanent?: boolean;
	onClick?: (card: GameCard) => void;
}

interface State {
	from: MotionState;
	to: MotionState;
	selectable: boolean;
	selected: boolean;
}

const defaultState: MotionState = {
	top: 0,
	left: 0,
	opacity: 1,
};

class MovableCard extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const { card } = props;
		this.state = {
			from: card.getStartState() || defaultState,
			to: card.getEndState() || defaultState,
			selectable: false,
			selected: false,
		};
	}

	componentDidMount(): void {
		const { permanent } = this.props;
		if (permanent) {
			const { card } = this.props;
			card.on('move', this.updatePos);
			card.on('selectableChanged', this.onSelectableChanged);
			card.on('selectedChanged', this.onSelectedChanged);
		}
	}

	componentWillUnmount(): void {
		const { card } = this.props;
		if (this.updatePos) {
			card.off('move', this.updatePos);
		}
		if (this.onSelectableChanged) {
			card.off('selectableChanged', this.onSelectableChanged);
		}
		if (this.onSelectedChanged) {
			card.off('selectedChanged', this.onSelectedChanged);
		}
	}

	handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault();
		this.toggle();
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		e.preventDefault();
		this.toggle();
	}

	updatePos = (): void => {
		const { card } = this.props;
		this.setState({
			from: card.getStartState() || defaultState,
			to: card.getEndState() || defaultState,
		});
	}

	onSelectableChanged = (selectable: boolean): void => this.setState({ selectable });

	onSelectedChanged = (selected: boolean): void => this.setState({ selected });

	toggle(): void {
		const {
			card,
			onClick,
		} = this.props;
		const selected = !card.isSelected();
		card.setSelected(selected);

		if (onClick) {
			onClick(card);
		}
	}

	render(): JSX.Element {
		const { card } = this.props;
		const { permanent } = this.props;
		const { selectable } = this.state;
		const { selected } = this.state;

		const { from, to } = this.state;
		const onEnd = permanent ? undefined : (): void => card.destroy();

		const classNames = ['wrapper'];
		if (selectable) {
			classNames.push('selectable');
			if (selected) {
				classNames.push('selected');
			}
		}
		const onClick = selectable ? this.handleClick : undefined;
		const onKeyDown = selectable ? this.handleKeyDown : undefined;

		return (
			<Movable from={from} to={to} onEnd={onEnd}>
				<div role="button" tabIndex={0} className={classNames && classNames.join(' ')} onClick={onClick} onKeyDown={onKeyDown}>
					<Card card={card.instance()} />
				</div>
			</Movable>
		);
	}
}

export default MovableCard;
