
import React from 'react';

import StartScene from './page/StartScene';
import Lobby from './page/Lobby';
import GeneralSelector from './page/GeneralSelector';
import Room from './page/Room';

import './global.scss';

function handlePageLoad(page, extra) {
	if (extra) {
		Object.assign(this, extra);
	}
	this.setState({ page });
}

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'start-scene',
		};
		this.client = null;
		this.room = null;

		this.handlePageLoad = handlePageLoad.bind(this);
	}

	render() {
		const { page } = this.state;
		if (page === 'start-scene') {
			return <StartScene onPageLoad={this.handlePageLoad} />;
		}
		if (page === 'lobby') {
			return <Lobby onPageLoad={this.handlePageLoad} client={this.client} />;
		}
		if (page === 'general-selector') {
			return <GeneralSelector onPageLoad={this.handlePageLoad} client={this.client} />;
		}
		if (page === 'room') {
			return <Room onPageLoad={this.handlePageLoad} room={this.room} />;
		}

		return <div>Invalid page name</div>;
	}
}
