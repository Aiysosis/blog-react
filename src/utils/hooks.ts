import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 通过useRef来避免函数组件的闭包
 * @param state
 * @returns state reference
 */
export function useStateRef<T>(state: T) {
	const stateRef = useRef(state);
	useEffect(() => {
		stateRef.current = state;
	}, [state]);
	return stateRef;
}

/**
 * 用于监视渲染的次数，用于开发
 */
export function useRenderWatcher() {
	const count = useRef(0);
	count.current++;
	console.log(`render times: ${count.current}`);
}


