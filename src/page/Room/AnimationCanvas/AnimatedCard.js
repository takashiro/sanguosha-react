
import React from 'react';
import {Transition} from 'react-transition-group';

import Card from '../component/Card';

function transitionText(timeout) {
	const properties = ['top', 'left', 'opacity'];
	return properties.map(function (property) {
		return `${property} ${timeout}ms ease-in-out`;
	}).join(', ');
}

class AnimatedCard extends React.Component {

	constructor(props) {
		super(props);

		const motion = props.motion;
		const from = motion.startPos();
		const to = motion.endPos();

		this.timeout = props.timeout || 800;

		this.frames = {
			exiting: {
				top: from.top,
				left: from.left,
				opacity: 0,
				transition: transitionText(this.timeout),
			},
			exited: {
				top: from.top,
				left: from.left,
				opacity: 0,
				transition: transitionText(this.timeout),
			},
			entering: {
				top: to.top,
				left: to.left,
				opacity: 1,
				transition: transitionText(this.timeout),
			},
			entered: {
				top: to.top,
				left: to.left,
				opacity: 1,
				transition: transitionText(this.timeout),
			},
		};

		this.state = {
			visible: false
		};
	}

	componentDidMount() {
		this.enteringTimer = setTimeout(() => {
			this.setState({visible: true});
		}, 100);

		const motion = this.props.motion;
		this.exitingTimer = setTimeout(function () {
			motion.setFinished(true);
		}, 100 + this.timeout);
	}

	componentWillUnmount() {
		if (this.enteringTimer) {
			clearTimeout(this.enteringTimer);
			this.enteringTimer = null;
		}

		if (this.exitingTimer) {
			clearTimeout(this.exitingTimer);
			this.exitingTimer;
		}
	}

	render() {
		const card = this.props.motion.card();
		const frames = this.frames;
		const onEnd = (node, done) => node.addEventListener('transitionend', done, false);

		return <Transition in={this.state.visible} addEndListener={onEnd}>
			{state => (<div className="animated-card" style={frames[state]}>
				<Card card={card} />
			</div>)}
		</Transition>;
	}

}

export default AnimatedCard;
