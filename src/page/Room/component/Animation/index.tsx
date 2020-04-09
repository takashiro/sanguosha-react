
import React from 'react';

import Meta from '../../../../game/Animation';

import './index.scss';

interface Props {
	meta: Meta;
	id?: number;
	onEnd?: (id: number) => void;
}

function waitForImage(img: HTMLImageElement): Promise<void> {
	return new Promise((resolve) => {
		if (img.tagName !== 'IMG' || img.complete) {
			setTimeout(resolve, 0);
		} else {
			img.addEventListener('load', () => {
				resolve();
			}, { once: true });
		}
	});
}

class Animation extends React.Component<Props, {}> {
	private node: React.RefObject<HTMLDivElement>;

	private startTime?: number;

	private currentFrame?: number;

	constructor(props: Props) {
		super(props);

		this.node = React.createRef();
	}

	componentDidMount(): void {
		setTimeout(() => {
			this.run();
		}, 0);
	}

	next = (time: number): void => {
		const frequency = 50;

		if (this.startTime) {
			if (time - this.startTime < frequency) {
				window.requestAnimationFrame(this.next);
				return;
			}
		} else {
			this.startTime = time;
		}

		const div = this.node.current;
		if (!div) {
			return;
		}

		if (this.currentFrame !== undefined) {
			div.children[this.currentFrame].classList.remove('current');
		}

		const { meta } = this.props;
		const { frame } = meta;
		const current = Math.floor((time - this.startTime) / frequency);
		if (current < frame) {
			div.children[current].classList.add('current');
			this.currentFrame = current;
			window.requestAnimationFrame(this.next);
		} else {
			const { id, onEnd } = this.props;
			if (onEnd) {
				setTimeout(onEnd, 0, id);
			}
		}
	};

	async run(): Promise<void> {
		const div = this.node.current;
		if (!div) {
			return;
		}

		await Promise.all(Array.prototype.map.call(div.children, waitForImage));
		window.requestAnimationFrame(this.next);
	}

	render(): JSX.Element {
		const { meta } = this.props;
		const {
			width,
			height,
			frame,
			name,
		} = meta;

		const style = {
			width: `${width}px`,
			height: `${height}px`,
		};

		const frames = new Array(frame);
		for (let i = 0; i < frames.length; i++) {
			frames[i] = i;
		}
		return (
			<div ref={this.node} className="animation" style={style}>
				{frames.map((i) => <img key={i} src={`style/animation/${name}/${i}.png`} alt="" />)}
			</div>
		);
	}
}

export default Animation;
