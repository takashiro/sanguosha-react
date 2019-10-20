
import React from 'react';

import './index.scss';

function Dialog(props) {
	const {
		width = 400,
		height = 300,
		title,
		children,
	} = props;

	const style = {
		width: `${width}px`,
		height: `${height}px`,
		marginLeft: -Math.round(width / 2),
		marginTop: -Math.round(height / 2),
		top: '50%',
		left: '50%',
	};

	return (
		<div className="dialog" style={style}>
			<h4>{title}</h4>
			<div className="content">
				{children}
			</div>
		</div>
	);
}

export default Dialog;
