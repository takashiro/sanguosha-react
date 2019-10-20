
import React from 'react';

import './index.scss';

function handleClick() {
	const { onClick } = this.props;
	setTimeout(onClick, 0);
}

class FinishButton extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = handleClick.bind(this);
	}

	render() {
		const { enabled } = this.props;
		const classNames = ['finish'];
		if (enabled) {
			classNames.push('enabled');
		}
		return (
			<button type="button" className={classNames.join(' ')} onClick={this.handleClick} />
		);
	}
}

export default FinishButton;
