import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

interface ToastProps {
	message: string;
}

export default class Toast extends React.Component<ToastProps, {}> {
	static makeToast(message: string): void {
		ReactDOM.render(
			<Toast message={message} />,
			document.getElementById('overlay'),
		);
	}

	protected toast: HTMLElement | null;

	constructor(props: ToastProps) {
		super(props);

		this.toast = null;
	}

	componentDidMount(): void {
		const { toast } = this;
		if (!toast) {
			return;
		}

		setTimeout((): void => {
			toast.classList.add('in');
		}, 0);

		setTimeout((): void => {
			toast.classList.remove('in');
			toast.classList.add('out');
		}, 900);

		setTimeout((): void => {
			const overlay = document.getElementById('overlay');
			if (overlay) {
				ReactDOM.unmountComponentAtNode(overlay);
			}
		}, 1200);
	}

	render(): JSX.Element {
		const { message } = this.props;
		return (
			<div className="toast" ref={(toast): void => { this.toast = toast; }}>
				{message}
			</div>
		);
	}
}
