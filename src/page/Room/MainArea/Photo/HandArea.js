
import React from 'react';

import Card from '../../component/Card';

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		const area = props.area;

		this.state = {
			num: area.size()
		};

		area.on('numChanged', num => this.setState({num}));
	}

	render() {
		return <div className="handcard-num">{this.state.num}</div>;
	}

}

export default HandArea;
