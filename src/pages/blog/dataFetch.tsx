import { Fragment, useEffect, useRef, useState } from "react";
import API from "../../services";
import { Blog } from "../../types/data";
import { BlogCard } from "./blogCard";

//* 总结一下数据获取过程中遇到的坑
//* 1. useState 不是同步更新，想要在多个setState之间顺序运行，使用函数的方式更新
//* 2. useRef 与 useState，两者生命周期一致，useRef不会主动触发更新，所以和 UI 无关的可以用useRef，有关的用useState

//todo 滚动事件节流
//todo loading组件
//todo 判断没有更多数据
type BlogsFetchState = {
	list: Blog[];
	page: number;
	loading: boolean;
};

const initState: BlogsFetchState = {
	list: [],
	page: 0,
	loading: true,
};

const PAGE_SIZE = 5;

export default function BlogsFetch() {
	const [state, setState] = useState<BlogsFetchState>(initState);
	const lock = useRef(false);

	const loadMore = () => {
		if (!lock.current) {
			console.log("loadmore");
			lock.current = true;
			setState(state => {
				return {
					...state,
					page: state.page + PAGE_SIZE,
				};
			});
		}
	};

	const fetchData = () => {
		API.blogs
			.getList(state.page)
			.then(res => {
				if (res) {
					const list = res.data.blogs;
					console.log(list);
					setState(state => {
						return {
							...state,
							list: [...state.list, ...list],
						};
					});
				}
			})
			.catch(err => {
				console.log(err);
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
		console.log("fetch data");
		fetchData();
	}, [state.page]);

	const element = state.list.map(blog => (
		<BlogCard blog={blog} key={blog.id} />
	));

	if (state.loading) {
		return <h1>Loading</h1>;
	} else return <Fragment>{element}</Fragment>;
}

function initScrollListener(loadMore: Function) {
	const root = document.getElementById("root");
	const scrollListener = () => {
		const { clientHeight, scrollTop, scrollHeight } = root;

		if (clientHeight + scrollTop >= scrollHeight - 50) {
			console.log("竖向滚动条已经滚动到底部");
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
