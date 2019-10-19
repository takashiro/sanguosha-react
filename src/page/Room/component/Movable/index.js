import React from 'react';

import './index.scss';

function onEnd() {
	const { onEnd } = this.props;
	if (onEnd) {
		setTimeout(onEnd, 0);
	}
}

class Movable extends React.Component {
	constructor(props) {
		super(props);

		const { from } = props;

		this.state = {
			top: from.top,
			left: from.left,
			opacity: from.opacity || 0,
		};

		this.onEnd = onEnd.bind(this);
	}

	componentDidMount() {
		const { to } = this.props;
		if (!to) {
			return;
		}

		this.timer = setTimeout(() => {
			this.setState({
				top: to.top,
				left: to.left,
				opacity: to.opacity,
			});
		}, 100);
	}

	componentDidUpdate() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			const { to } = this.props;
			this.setState({
				top: to.top,
				left: to.left,
				opacity: to.opacity,
			});
		}, 100);
	}

	componentWillUnmount() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}

	render() {
		const style = {
			top: this.state.top,
			left: this.state.left,
			opacity: this.state.opacity,
		};

		return (
			<div className="movable" style={style} onTransitionEnd={this.onEnd}>
				{this.props.children}
			</div>
		);
	}
}

export default Movable;
