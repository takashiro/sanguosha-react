
class Enum {

	/**
	 * Create an enumeration
	 */
	constructor() {
		this.enums = [...arguments];

		for (let i = 0; i < arguments.length; i++) {
			this[arguments[i]] = i;
		}

		Object.freeze(this);
	}

	/**
	 * Convert number into this enumeration string
	 * @param {number} num
	 * @return {string}
	 */
	fromNum(num) {
		return this.enums[num];
	}

}

export default Enum;
