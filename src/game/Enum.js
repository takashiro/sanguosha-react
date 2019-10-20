
class Enum {
	/**
	 * Create an enumeration
	 */
	constructor(...enums) {
		this.enums = [...enums];

		for (let i = 0; i < enums.length; i++) {
			this[enums[i]] = i;
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
