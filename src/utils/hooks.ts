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

/**
 * 通过自定义hook实现 setState的回调函数 https://zhuanlan.zhihu.com/p/266203370
 * @param initialState
 * @returns
 */
export function useStateWithCallback<T>(
	initialState: T
): [T, (value: React.SetStateAction<T>, ...callbacks: Function[]) => void] {
	const [state, setState] = useState(initialState);
	const [key, setKey] = useState({}); // promise to update when call setState
	const handlers = useRef(new Set<Function>()).current;

	useEffect(() => {
		handlers.forEach(handler => handler());
		handlers.clear();
	}, [key]);

	return [
		state,
		useCallback(
			(value: React.SetStateAction<T>, ...callbacks: Function[]) => {
				if (callbacks) {
					for (const callback of callbacks) {
						handlers.add(callback);
					}
				}
				setState(value);
				setKey({}); // create a empty object each time, inorder to trigger useEffect
			},
			[]
		),
	];
}
