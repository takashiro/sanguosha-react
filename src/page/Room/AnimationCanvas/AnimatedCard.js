
import React from 'react';
import {Transition} from 'react-transition-group';

import Card from '../component/Card';

function transitionText(timeout) {
	const properties = ['top', 'left', 'opacity'];
	return properties.map(function (property) {
		return `${property} ${timeout}ms ease-in-out`;
	}).join(', ');
}

function onExited() {
	if (this.props.onExited) {
		setTimeout(this.props.onExited, 0, this.props.card);
	}
}

class AnimatedCard extends React.Component {

	constructor(props) {
		super(props);

		const path = props.path;
		const from = path.from;
		const to = path.to;

		this.timeout = props.timeout || 800;

		this.frames = {
			entering: {
				top: from.top,
				left: from.left,
				opacity: 0,
				transition: transitionText(this.timeout),
			},
			entered: {
				top: to.top,
				left: to.left,
				opacity: 1,
				transition: transitionText(this.timeout),
			},
			exiting: {
				top: to.top,
				left: to.left,
				opacity: 1,
				transition: transitionText(this.timeout),
			},
			exited: {
				top: to.top,
				left: to.left,
				opacity: 0,
				transition: transitionText(this.timeout / 8),
			}
		};

		this.state = {
			visible: false
		};

		this.onExited = onExited.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ visible: true });
		}, 0);
		setTimeout(() => {
			this.setState({ visible: false });
		}, this.timeout * 2);
	}

	render() {
		const card = this.props.card;
		const frames = this.frames;
		const onEnd = (node, done) => node.addEventListener('transitionend', done, false);

		return <Transition in={this.state.visible} onExited={this.onExited} addEndListener={onEnd}>
			{state => (<div className="animated-card" style={frames[state]}>
				<Card card={card} />
			</div>)}
		</Transition>;
	}

}

export default AnimatedCard;
