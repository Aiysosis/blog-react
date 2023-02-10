import { useCallback, useEffect, useState } from "react";
import API from "../../../services";
import { Tag } from "../../../types/data";
import { useStateRef } from "../../../utils/hooks";

export interface TagsState {
	tags: Tag[];
	selected: Record<number, boolean>;
	loading: boolean;
	hasError: boolean;
}

const initialState: TagsState = {
	tags: [],
	selected: {},
	loading: true,
	hasError: false,
};

//调用思路： 在顶层index.tsx中调用，然后分别分发到tags 和 right bar中
export function useTagsData(
	setBlogList: Function,
	resetBlogList: Function,
	setBlogLoading: Function,
	needReset: () => boolean
) {
	const [tagsState, setTagsState] = useState(initialState);
	const tagsStateRef = useStateRef(tagsState);

	const fetchData = (fetchAll: boolean) => {
		const promise = fetchAll
			? API.tags.getTags()
			: API.tags.getRecommandTags();

		promise
			.then(res => {
				if (res) {
					const list = res.data;
					const selectedObj: Record<number, boolean> = {};

					for (const tag of list) {
						selectedObj[tag.id] = false;
					}

					setTagsState(state => {
						return {
							...state,
							tags: list,
							selected: selectedObj,
							loading: false,
							hasError: false,
						};
					});
				}
			})
			.catch(err => {
				console.warn(err);
				setTagsState(state => {
					return {
						...state,
						hasError: true,
						loading: false,
					};
				});
			});
	};

	const handleSelectChange = (id: number) => {
		setTagsState(state => {
			const { selected } = state;
			const next = {
				...selected,
				[id]: !selected[id],
			};
			return {
				...state,
				selected: next,
			};
		});
	};

	const submitSelect = () => {
		const { selected } = tagsStateRef.current;

		const ids: number[] = [];

		for (const key in selected) {
			if (selected[key]) ids.push(parseInt(key));
		}

		if (ids.length === 0) {
			if (needReset()) resetBlogList();
			return;
		}

		console.log("search params: ", ids);

		setBlogLoading();

		API.tags
			.searchByTags(ids)
			.then(res => {
				if (res) {
					setBlogList(res.data);
				}
			})
			.catch(err => {
				console.warn(err);
			});
	};

	useEffect(() => {
		submitSelect();
	}, [tagsState.selected]);

	const resetSelectedTags = () => {
		const newObj: Record<number, boolean> = {};
		const { tags } = tagsStateRef.current;

		for (const key in tags) {
			newObj[key] = false;
		}

		resetBlogList();

		setTagsState(state => {
			return {
				...state,
				selected: newObj,
			};
		});
	};

	return {
		tagsState,
		setTagsState,
		tagsStateRef,
		fetchData,
		submitSelect,
		resetSelectedTags,
		handleSelectChange,
	};
}
