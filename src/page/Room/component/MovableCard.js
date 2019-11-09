import React from 'react';

import Movable from './Movable';
import Card from './Card';

function updatePos() {
	const { card } = this.props;
	this.setState({
		from: card.getStartState(),
		to: card.getEndState(),
	});
}

function onSelectableChanged(selectable) {
	this.setState({ selectable });
}

function onSelectedChanged(selected) {
	this.setState({ selected });
}

function handleClick() {
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
			from: card.getStartState(),
			to: card.getEndState(),
			selectable: false,
			selected: false,
		};

		this.handleClick = handleClick.bind(this);
	}

	componentDidMount() {
		const { permanent } = this.props;
		if (permanent) {
			const { card } = this.props;
			this.updatePos = updatePos.bind(this);
			card.on('move', this.updatePos);
			this.onSelectableChanged = onSelectableChanged.bind(this);
			card.on('selectableChanged', this.onSelectableChanged);
			this.onSelectedChanged = onSelectedChanged.bind(this);
			card.on('selectedChanged', this.onSelectedChanged);
		}
	}

	componentWillUnmount() {
		const { card } = this.props;
		if (this.updatePos) {
			card.off('move', this.updatePos);
			this.updatePos = null;
		}
		if (this.onSelectableChanged) {
			card.off('selectableChanged', this.onSelectableChanged);
			this.onSelectableChanged = null;
		}
		if (this.onSelectedChanged) {
			card.off('selectedChanged', this.onSelectedChanged);
			this.onSelectedChanged = null;
		}
	}

	render() {
		const { card } = this.props;
		const { permanent } = this.props;
		const { selectable } = this.state;
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
		const onClick = selectable ? this.handleClick : null;

		return (
			<Movable from={from} to={to} onEnd={onEnd}>
				<div role="button" tabIndex="0" className={classNames && classNames.join(' ')} onClick={onClick} onKeyDown={onClick}>
					<Card card={card.instance()} />
				</div>
			</Movable>
		);
	}
}

export default MovableCard;
