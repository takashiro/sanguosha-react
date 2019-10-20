import React from 'react';

import './index.scss';

function handleTransitionEnd() {
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

		this.handleTransitionEnd = handleTransitionEnd.bind(this);
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
		const {
			top,
			left,
			opacity,
		} = this.state;

		const style = {
			top,
			left,
			opacity,
		};

		const { children } = this.props;
		return (
			<div className="movable" style={style} onTransitionEnd={this.handleTransitionEnd}>
				{children}
			</div>
		);
	}
}

export default Movable;
