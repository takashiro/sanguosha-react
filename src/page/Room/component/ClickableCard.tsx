import React from 'react';

import Card from '../../../game/Card';
import CardItem from './Card';

interface CardProps {
	card: Card;
	onClick?: (card: Card) => void;
}

export default class ClickableCard extends React.Component<CardProps, unknown> {
	handleClick = (): void => {
		const { onClick } = this.props;
		if (onClick) {
			const { card } = this.props;
			onClick(card);
		}
	}

	handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
			this.handleClick();
		}
	}

	render(): JSX.Element {
		const { card } = this.props;

		return (
			<div className="clickable-card" role="button" tabIndex={0} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
				<CardItem card={card} />
			</div>
		);
	}
}
