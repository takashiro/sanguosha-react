
import React from 'react';

import './index.scss';

class Animation extends React.Component {
	run(div) {
		let current = 0;
		const { frame } = this.props;
		const rate = 48;
		function next() {
			div.children[current].classList.remove('current');
			current++;
			div.children[current].classList.add('current');

			if (current < frame) {
				setTimeout(next, rate);
			} else {
				setTimeout(function () {
					div.children[current].classList.remove('current');
				}, rate);
			}
		}

		Promise.all(Array.prototype.map.call(div.children, (img) => new Promise((resolve) => {
			if (img.tagName !== 'IMG' || img.loaded) {
				setTimeout(resolve, 0);
			} else {
				img.addEventListener('load', resolve, { once: true });
			}
		}))).then(next);
	}

	render() {
		const {
			width,
			height,
			frame,
			name,
		} = this.props;

		const style = {
			width: `${width}px`,
			height: `${height}px`,
		};

		const frames = new Array(frame + 1);
		for (let i = 0; i < frames.length; i++) {
			frames[i] = <img key={i} src={`style/animation/${name}/${i}.png`} alt="" />;
		}

		return (
			<div className="animation" style={style} ref={(div) => this.run(div)}>
				{frames}
			</div>
		);
	}
}

export default Animation;
