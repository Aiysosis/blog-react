import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services";
import { BlogDetail } from "../../types/data";
import { useStateRef } from "../../utils/hooks";

type BlogDetailState = {
	content: string;
	blogDetail: BlogDetail;
	loading: boolean;
};

const initialState: BlogDetailState = {
	content: "",
	blogDetail: null,
	loading: true,
};

export function useData() {
	const { id } = useParams();
	const [state, setState] = useState(initialState);
	const stateRef = useStateRef(state);

	const fetchData = async () => {
		let res = await API.blogs.getById(+id).catch(err => {
			console.warn("获取博客数据失败", err);
		});
		if (res) {
			const detail = res.data;
			setState(state => {
				return {
					...state,
					content: "",
					blogDetail: detail,
				};
			});
			const { path } = res.data;
			const contentRes = await API.blogs.getContent(path).catch(err => {
				console.warn("获取内容失败", err);
			});
			if (contentRes) {
				const content = contentRes.data;
				setState(state => {
					return {
						...state,
						content: content,
						loading: false,
					};
				});
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		state,
		stateRef,
	};
}
