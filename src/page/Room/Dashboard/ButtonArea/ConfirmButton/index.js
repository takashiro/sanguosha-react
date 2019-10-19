
import React from 'react';

import './index.scss';

function onClick() {
	const { onClick } = this.props;
	setTimeout(onClick, 0);
}

class ConfirmButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = onClick.bind(this);
	}

	render() {
		const classNames = ['confirm'];
		if (this.props.enabled) {
			classNames.push('enabled');
		}
		return (
			<button className={classNames.join(' ')} onClick={this.onClick} />
		);
	}
}

export default ConfirmButton;
