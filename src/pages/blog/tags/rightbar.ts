import { useState } from "react";

export function useRightbar() {
	const [rightbarState, setRightbarState] = useState(false);
	const openRightbar = () => setRightbarState(true);
	const closeRightbar = () => setRightbarState(false);

	return {
		rightbarState,
		openRightbar,
		closeRightbar,
	};
}
