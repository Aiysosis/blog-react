import { Fragment, useEffect, useRef, useState } from "react";
import { LoadingComponent } from "../../components/loading";
import API from "../../services";
import { Blog } from "../../types/data";
import { BlogCard } from "./blogCard";

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
	num: number;
	loading: boolean;
	hasMore: boolean;
};

const initState: BlogsFetchState = {
	list: [],
	num: 0,
	loading: true,
	hasMore: true,
};

const PAGE_SIZE = 5;

export default function BlogsFetch() {
	const [state, setState] = useState<BlogsFetchState>(initState);
	const lock = useRef(false);
	const maxNum = useRef(0);

	const loadMore = () => {
		if (!lock.current && state.hasMore) {
			// console.log("loadmore");
			lock.current = true;
			setState(state => {
				let nextNum = state.num + PAGE_SIZE;
				if (nextNum < maxNum.current) {
					//还有更多
					return {
						...state,
						num: nextNum,
						loading: true,
						hasMore: true,
					};
				} else {
					return {
						...state,
						num: nextNum,
						loading: false,
						hasMore: false,
					};
				}
			});
		}
	};

	const fetchData = () => {
		API.blogs
			.getList(state.num)
			.then(res => {
				if (res) {
					const list = res.data.blogs;
					if (res.data.count !== -1) {
						maxNum.current = res.data.count;
					}
					setState(state => {
						return {
							...state,
							list: [...state.list, ...list],
						};
					});
				}
			})
			.catch(err => {
				console.warn(err);
			})
			.finally(() => {
				lock.current = false;
				setState(state => {
					return {
						...state,
						loading: false,
					};
				});
			});
	};

	initScrollListener(loadMore);

	useEffect(() => {
		//fetch data & load more
		// console.log("fetch data");
		fetchData();
	}, [state.num]);

	const element = state.list.map(blog => (
		<BlogCard blog={blog} key={blog.id} />
	));

	return (
		<Fragment>
			{element}
			{!state.hasMore ? (
				<div className="no-more">没有更多了 ＜（＾－＾）＞</div>
			) : null}
			{state.loading ? (
				<div className="loading">
					<LoadingComponent />
				</div>
			) : null}
		</Fragment>
	);
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
