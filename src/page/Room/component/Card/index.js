
import React from 'react';

import './index.scss';

class Card extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			suit: props.suit,
			color: props.color,
			number: props.number,
			name: props.name,
		};
	}

	render() {
		let style = {
			backgroundImage: `url(style/card/${this.state.name}.png)`,
		};
		let className = 'card ' + this.state.color;
		let suit = 'suit ' + this.state.suit;
		let number = {
			backgroundImage: `url(style/card/number/${this.state.color}/${this.state.number}.png)`,
		};

		return <div className="card" style={style}>
			<div className={suit} />
			<div className="number" style={number} />
		</div>;
	}

}

export default Card;
