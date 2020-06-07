interface Position {
	top: number;
	left: number;
}

/**
 * Locate the center position of an element
 * @param element
 */
export default function locateCenterPos(element: Element): Position {
	const rect = element.getBoundingClientRect();
	const left = (rect.left + rect.right) / 2;
	const top = (rect.top + rect.bottom) / 2;
	return { top, left };
}
