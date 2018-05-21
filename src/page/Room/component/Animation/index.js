
import React from 'react';

import './index.scss';

class Animation extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const style = {
			width: this.props.width + 'px',
			height: this.props.height + 'px',
		};

		const frames = new Array(this.props.frame + 1);
		for (let i = 0; i < frames.length; i++) {
			frames[i] = <img key={i} src={`style/animation/${this.props.name}/${i}.png`} />;
		}

		return <div className="animation" style={style} ref={div => this.run(div)}>
			{frames}
		</div>;
	}

	run(div) {
		let current = 0;
		const frameNum = this.props.frame;
		const rate = 48;
		function next() {
			div.children[current].classList.remove('current');
			current++;
			div.children[current].classList.add('current');

			if (current < frameNum) {
				setTimeout(next, rate);
			} else {
				setTimeout(function () {
					div.children[current].classList.remove('current');
				}, rate);
			}
		}

		Promise.all(Array.prototype.map.call(div.children, img => {
			return new Promise((resolve, reject) => {
				if (img.tagName !== 'IMG' || img.loaded) {
					setTimeout(resolve, 0);
				} else {
					img.addEventListener('load', resolve, {once: true});
				}
			});
		})).then(next);
	}
}

export default Animation;
