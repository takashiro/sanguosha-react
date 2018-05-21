
import React from 'react';

import './index.scss';

class PhotoLayout extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			num: props.num,
		}
	}

	render() {
		return <div className={'photo-layout n' + this.state.num}>
			{this.props.children}
		</div>;
	}

}

export default PhotoLayout;
