
import React from 'react';

import './index.scss';

class Dialog extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const width = this.props.width || 400;
		const height = this.props.height || 300;
		const style = {
			width: width + 'px',
			height: height + 'px',
			marginLeft: -Math.round(width / 2),
			marginTop: -Math.round(height / 2),
			top : '50%',
			left : '50%',
		};

		return <div className="dialog" style={style}>
			<h4>{this.props.title}</h4>
			<div className="content">
				{this.props.children}
			</div>
		</div>;
	}

}

export default Dialog;
