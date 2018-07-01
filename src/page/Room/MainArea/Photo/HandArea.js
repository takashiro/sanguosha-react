
import React from 'react';

class HandArea extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			num: 0
		};

		const area = props.area;
		area.on('numChanged', num => this.setState({num}));
	}

	render() {
		return <div className="handcard-num">{this.state.num}</div>;
	}

}

export default HandArea;
