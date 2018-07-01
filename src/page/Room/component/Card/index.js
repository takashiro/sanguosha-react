
import React from 'react';

import './index.scss';

function applyStyle(state, style) {
	if (state.opacity) {
		style.opacity = state.opacity;
	}
	if (state.top) {
		style.top = state.top + 'px';
	}
	if (state.left) {
		style.left = state.left + 'px';
	}
}

class Card extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			suit: props.suit,
			color: props.color,
			number: props.number,
			name: props.name,
		};

		this.node = React.createRef();
	}

	goBack() {
		let style = this.node.current.style;
		let end = this.props.end;
		if (end) {
			applyStyle(end, style);
		} else {
			style.left = '0';
			style.top = '0';
			style.opacity = 1;
		}
	}

	componentDidMount() {
		setTimeout(() => this.goBack(), 0);
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
		if (this.props.start) {
			applyStyle(this.props.start, style);
		}

		return <div ref={this.node} className={className} style={style}>
			<div className={suit} />
			<div className="number" style={number} />
		</div>;
	}

}

export default Card;
