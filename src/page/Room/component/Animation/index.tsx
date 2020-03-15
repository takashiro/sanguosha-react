
import React from 'react';

import './index.scss';

interface Props {
	width: number;
	height: number;
	frame: number;
	name: string;
}

class Animation extends React.Component<Props, {}> {
	async run(div: HTMLDivElement): Promise<void> {
		let current = 0;
		const { frame } = this.props;
		const rate = 48;
		function next(): void {
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

		await Promise.all(Array.prototype.map.call(div.children, (img) => new Promise((resolve) => {
			if (img.tagName !== 'IMG' || img.loaded) {
				setTimeout(resolve, 0);
			} else {
				img.addEventListener('load', resolve, { once: true });
			}
		})));

		next();
	}

	render(): JSX.Element {
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
			<div className="animation" style={style} ref={(div: HTMLDivElement): Promise<void> => this.run(div)}>
				{frames}
			</div>
		);
	}
}

export default Animation;
