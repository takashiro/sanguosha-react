
import React from 'react';

import PhotoLayout from './PhotoLayout';

import Room from '../../../game/Room';

import './index.scss';

interface MainAreaProps {
	room: Room;
}

class MainArea extends React.Component<MainAreaProps, {}> {
	private node: React.RefObject<HTMLDivElement>;

	constructor(props: MainAreaProps) {
		super(props);

		this.node = React.createRef();
	}

	render(): JSX.Element {
		const { room } = this.props;
		return (
			<div ref={this.node} className="main-area">
				<PhotoLayout room={room} />
			</div>
		);
	}
}

export default MainArea;
