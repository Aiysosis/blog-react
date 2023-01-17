import { useEffect, useRef, useState } from "react";
import API from "../../services";
import { Blog } from "../../types/data";
import { useRenderWatcher, useStateRef } from "../../utils/hooks";

//* 总结一下数据获取过程中遇到的坑
//* 1. useState 不是同步更新，想要在多个setState之间顺序运行，使用函数的方式更新
//* 2. useRef 与 useState，两者生命周期一致，useRef不会主动触发更新，所以和 UI 无关的可以用useRef，有关的用useState
//* 3. react 的更新驱动和vue有所不同，这里的loadmore是通过设置page，然后 fetchData包裹在useEffect中，监听page的变动而实现的

//todo 滚动事件节流
//* loading组件
//* 判断没有更多数据
//todo 列表动画
//todo 前端缓存
type BlogsFetchState = {
	list: Blog[];
	listBackup: Blog[];
	maxNum: number;
	loading: boolean;
	hasMore: boolean;
	hasError: boolean;
	selectedTags: number[];
};

const initialState: BlogsFetchState = {
	list: [],
	listBackup: [],
	maxNum: Number.MAX_SAFE_INTEGER,
	loading: true,
	hasMore: true,
	hasError: false,
	selectedTags: [],
};

export function useData() {
	//思路 通过先改变num来触发 effect，从而重新获取
	useRenderWatcher();

	const [state, setState] = useState(initialState);
	const stateRef = useStateRef(state); //for function use
	const lock = useRef(false);

	const loadMore = () => {
		//! 当心闭包陷阱！ 这里的state永远是初始的state，所以要用useRef包裹起来
		//! 错误写法 if(state...) 这里的state由于闭包永远不会改变
		const { hasMore, list } = stateRef.current;

		if (!lock.current && hasMore) {
			lock.current = true;
			fetchData(list.length);
		}
	};

	const fetchData = (skip: number) => {
		setState(state => {
			return {
				...state,
				loading: true,
			};
		});
		API.blogs
			.getList(skip)
			.then(res => {
				if (res) {
					const list = res.data.blogs;
					let maxNum = stateRef.current.maxNum; //闭包陷阱
					if (res.data.count !== -1) {
						maxNum = res.data.count;
					}
					setState(state => {
						return {
							...state,
							list: [...state.list, ...list],
							listBackup: [...state.list, ...list],
							maxNum,
							loading: false,
							hasMore: state.list.length < maxNum,
							hasError: false,
						};
					});
				}
			})
			.catch(err => {
				console.warn(err);
				setState(state => {
					return {
						...state,
						hasError: true,
						loading: false,
					};
				});
			})
			.finally(() => {
				lock.current = false;
			});
	};

	initScrollListener(loadMore);

	useEffect(() => {
		//init
		fetchData(0);
	}, []);

	//没有自定义名称的需求，所以这里使用对象
	return { state, setState, stateRef };
}

function initScrollListener(loadMore: Function) {
	const root = document.getElementById("root");
	const scrollListener = () => {
		const { clientHeight, scrollTop, scrollHeight } = root;

		if (clientHeight + scrollTop >= scrollHeight - 150) {
			// console.log("竖向滚动条已经滚动到底部");
			loadMore();
		}
	};

	const addScrollListener = () => {
		root.addEventListener("scroll", scrollListener);
	};
	const removeScrollListener = () => {
		root.removeEventListener("scroll", scrollListener);
	};

	// add listener after mount
	useEffect(() => {
		addScrollListener();
		return removeScrollListener;
	}, []);
}
