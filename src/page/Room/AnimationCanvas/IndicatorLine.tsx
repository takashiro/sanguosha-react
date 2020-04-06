import React from 'react';

import MotionPosition from '../../../game/MotionPosition';

import './IndicatorLine.scss';

enum TransitionStatus {
	Init,
	In,
	Out,
}

interface IndicatorLineProps {
	id?: number;
	styleClass?: string;
	onEnd?: (id?: number) => void;
	from: MotionPosition;
	to: MotionPosition;
}

interface IndicatorLineState {
	status: TransitionStatus;
}

interface IndicatorStyle extends MotionPosition {
	width?: number;
	transform?: string;
	opacity?: number;
}

export default class IndicatorLine extends React.Component<IndicatorLineProps, IndicatorLineState> {
	constructor(props: IndicatorLineProps) {
		super(props);

		this.state = {
			status: TransitionStatus.Init,
		};
	}

	componentDidMount(): void {
		setTimeout(() => {
			this.setState({ status: TransitionStatus.In });
		}, 0);

		setTimeout(() => {
			this.setState({ status: TransitionStatus.Out });
		}, 600);

		const { id, onEnd } = this.props;
		if (onEnd) {
			setTimeout(onEnd, 1200, id);
		}
	}

	render(): JSX.Element {
		const { styleClass, from, to } = this.props;
		const style: IndicatorStyle = {
			...from,
		};
		const { status } = this.state;
		if (status >= TransitionStatus.In) {
			const dy = to.top - from.top;
			const dx = to.left - from.left;
			const distance = (dy * dy + dx * dx) ** 0.5;
			const deg = (Math.atan2(dy, dx) / Math.PI) * 180;
			style.width = distance;
			style.transform = `rotate(${deg}deg)`;
		}
		if (status >= TransitionStatus.Out) {
			style.opacity = 0;
		}

		return (
			<div
				className={`indicator-line ${styleClass}`}
				style={style}
			/>
		);
	}
}
