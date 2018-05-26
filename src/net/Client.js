

import EventEmitter from 'events';

import Packet from './Packet';

class Client extends EventEmitter {

	/**
	 * Create a client instance
	 * @param {string} url Server URL
	 */
	constructor(url) {
		super();

		this.setUrl(url);
		this.socket = null;

		this.onmessage = new Map;
	}

	/**
	 * Setter of server URL
	 * @param {string} url Server URL
	 */
	setUrl(url) {
		if (url) {
			let absolute_path = /^\w+:\/\/.+/i;
			if (absolute_path.test(url)) {
				this.url = url;
			} else {
				let domain_split = url.indexOf('/');
				let domain = '';
				let path = '';
				if (domain_split == -1) {
					domain = url;
				} else {
					domain = url.substr(0, domain_split);
					path = url.substr(domain_split + 1);
				}
				if (domain.indexOf(':') >= 0) {
					this.url = 'ws://' + domain + '/' + path;
				} else {
					this.url = 'ws://' + domain + ':2610/' + path;
				}
			}
		} else {
			this.url = '';
		}
	}

	/**
	 * Connect to a server
	 * @param {string} url server URL
	 */
	connect(url) {
		this.setUrl(url);
		if (!this.url) {
			return false;
		}

		try {
			this.socket = new WebSocket(this.url);
		} catch (error) {
			this.emit('error', error.message);
			return;
		}

		this.socket.onopen = () => {
			this.emit('open');
		};
		this.socket.onmessage = e => {
			let packet = new Packet(e.data);
			this.trigger(packet.command, packet.arguments);
		};
		this.socket.onclose = e => {
			this.emit('close', e);
			this.socket = null;
		};

		return true;
	}

	/**
	 * Disconnect from the server
	 */
	disconnect(){
		if(this.socket){
			this.socket.close();
			this.socket = null;
		}
	}

	/**
	 * Check if it's connected to a server
	 * @param {boolean}
	 */
	get connected(){
		return this.socket && this.socket.readyState == WebSocket.OPEN;
	}

	/**
	 * Connection state
	 * @return {number}
	 */
	get state(){
		if (this.socket) {
			return this.socket.readyState;
		} else {
			return WebSocket.CONNECTING;
		}
	}

	/**
	 * Send a request to server
	 * @param {number} command
	 * @param {object} args
	 */
	request(command, args = null) {
		let packet = new Packet;
		packet.command = command;
		packet.arguments = args;
		packet.timeout = 0;
		this.socket.send(packet.toJSON());
	}

	/**
	 * Trigger a message handler
	 * @param {number} command
	 * @param {object} args
	 */
	trigger(command, args = null) {
		let handler = this.onmessage.get(command);
		if (handler) {
			handler.call(this, args);
		}
	}

	/**
	 * Bind a message handler
	 * @param {number} command
	 * @param {Function} callback
	 */
	bind(command, callback) {
		this.onmessage.set(command, callback);
	}

	/**
	 * Unbind a message handler
	 * @param {number} command
	 */
	unbind(command) {
		this.onmessage.delete(command);
	}

};

export default Client;
