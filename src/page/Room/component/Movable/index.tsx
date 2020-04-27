import React from 'react';

import MotionState from '../../../../game/MotionState';

import './index.scss';

interface Props {
	className?: string;
	from: MotionState;
	to: MotionState;
	onEnd?: () => void;
}

class Movable extends React.Component<Props, MotionState> {
	private timer?: NodeJS.Timeout;

	constructor(props: Props) {
		super(props);

		const { from } = props;

		this.state = {
			top: from.top,
			left: from.left,
			opacity: from.opacity || 0,
		};
	}

	componentDidMount(): void {
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

	componentDidUpdate(): void {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(() => {
			const { to } = this.props;
			this.setState({
				top: to.top,
				left: to.left,
				opacity: to.opacity,
			});
		}, 100);
	}

	componentWillUnmount(): void {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = undefined;
		}
	}

	handleTransitionEnd = (): void => {
		const { onEnd } = this.props;
		if (onEnd) {
			setTimeout(onEnd, 0);
		}
	}

	render(): JSX.Element {
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

		const { className, children } = this.props;
		const classNames = ['movable'];
		if (className) {
			classNames.push(className);
		}
		return (
			<div className={classNames.join(' ')} style={style} onTransitionEnd={this.handleTransitionEnd}>
				{children}
			</div>
		);
	}
}

export default Movable;
