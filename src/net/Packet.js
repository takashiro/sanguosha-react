
class Packet {

	/**
	 * Construct a network packet with JSON string representation
	 * @param {object} data
	 */
	constructor(data = null){
		this.command = 0;
		this.timeout = 0;
		this.arguments = null;
		if (data) {
			try {
				data = JSON.parse(data);
				if (data instanceof Array) {
					this.command = data[0];
					this.timeout = data[1];
					this.arguments = data[2];
				}
			} catch (error) {
				alert(error);
			}
		}
	}

	/**
	 * Convert a network packet into JSON string representation
	 * @return {string} JSON string
	 */
	toJSON(){
		return JSON.stringify([
			this.command,
			this.timeout,
			this.arguments
		]);
	}

}

export default Packet;
