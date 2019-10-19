
import React from 'react';

import './index.scss';

function onClick() {
	const { onClick } = this.props;
	setTimeout(onClick, 0);
}

class FinishButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = onClick.bind(this);
	}

	render() {
		const classNames = ['finish'];
		if (this.props.enabled) {
			classNames.push('enabled');
		}
		return (
			<button className={classNames.join(' ')} onClick={this.onClick} />
		);
	}
}

export default FinishButton;
