import React from 'react';

import './index.scss';

interface BoxProps {
	className?: string;
	children?: React.ReactNode;
}

export default function FloatBox(props: BoxProps): JSX.Element {
	const classNames: string[] = [
		'float-box',
	];
	const { className } = props;
	if (className) {
		classNames.push(className);
	}

	const { children } = props;
	return (
		<div className={classNames.join(' ')}>
			{children}
		</div>
	);
}
