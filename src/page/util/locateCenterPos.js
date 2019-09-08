
/**
 * Locate the center position of an element
 * @param {HTMLElement} element
 * @return {{top: number, left: number}}
 */
export default function locateCenterPos(element) {
	const rect = element.getBoundingClientRect();
	const left = (rect.left + rect.right) / 2;
	const top = (rect.top + rect.bottom) / 2;
	return {top, left};
}
