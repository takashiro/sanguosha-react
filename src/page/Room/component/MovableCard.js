import React from 'react';

import Movable from './Movable';
import Card from './Card';

function updatePos() {
	const { card } = this.props;
	this.setState({
		from: card.startState(),
		to: card.endState(),
	});
}

function updateSelection(selected) {
	this.setState({ selected });
}

function onClick() {
	const { card } = this.props;
	const selected = !card.isSelected();
	card.setSelected(selected);
	if (this.props.onClick) {
		setTimeout(this.props.onClick, 0, this.props.card);
	}
}

class MovableCard extends React.Component {
	constructor(props) {
		super(props);

		const { card } = props;
		this.state = {
			from: card.startState(),
			to: card.endState(),
			selected: false,
		};

		this.onClick = onClick.bind(this);
	}

	componentDidMount() {
		const { permanent } = this.props;
		if (permanent) {
			const { card } = this.props;
			this.updatePos = updatePos.bind(this);
			this.updateSelection = updateSelection.bind(this);
			card.on('move', this.updatePos);
			card.on('selectedChanged', this.updateSelection);
		}
	}

	componentWillUnmount() {
		const { card } = this.props;
		if (this.updatePos) {
			card.off('move', this.updatePos);
			this.updatePos = null;
		}
		if (this.updateSelection) {
			card.off('selectedChanged', this.updateSelection);
			this.updateSelection = null;
		}
	}

	render() {
		const { card } = this.props;
		const { permanent } = this.props;
		const { selectable } = this.props;
		const { selected } = this.state;

		const { from, to } = this.state;
		const onEnd = permanent ? null : () => card.destroy();

		const classNames = ['wrapper'];
		if (selectable) {
			classNames.push('selectable');
			if (selected) {
				classNames.push('selected');
			}
		}
		const onClick = selectable ? this.onClick : null;

		return (
			<Movable from={from} to={to} onEnd={onEnd}>
				<div className={classNames && classNames.join(' ')} onClick={onClick}>
					<Card card={card.instance()} />
				</div>
			</Movable>
		);
	}
}

export default MovableCard;
