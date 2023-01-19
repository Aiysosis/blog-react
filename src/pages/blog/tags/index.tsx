import { Fragment, useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/loading";
import { Blog, Tag } from "../../../types/data";
import { TagsState, useTagsData } from "./tags";

type TagsListProps = {
	fetchAll: boolean;
	tagsState: TagsState;
	// setBlogList: (list: Blog[]) => void;
	// setLoading: () => void;
	// resetBlogList: () => void;
	// needResetList: () => boolean;
	fetchData: (fetchAll: boolean) => void;
	handleSelectChange: (id: number) => void;
};

export function TagsList(props: TagsListProps) {
	const { fetchAll, tagsState, fetchData, handleSelectChange } = props;

	const { tags, selected, loading } = tagsState;

	useEffect(() => {
		fetchData(fetchAll);
	}, []);

	const tagsElement = tags.map(tag => {
		const { id, tagName, count } = tag;
		return (
			<div key={id}>
				<input
					type="checkbox"
					value={id}
					id={id.toString()}
					checked={selected[id]}
					onChange={() => {
						handleSelectChange(id);
					}}
				/>
				<label
					htmlFor={id.toString()}
					className="side-single-tag"
				>{`${tagName}(${count})`}</label>
			</div>
		);
	});

	return (
		<Fragment>
			{tagsElement}
			{loading ? (
				<div className="loading">
					<LoadingComponent />
				</div>
			) : null}
		</Fragment>
	);
}

export type TagsProps = {
	showAllTags: () => void;
	setBlogList: (list: Blog[]) => void;
	setLoading: () => void;
	resetBlogList: () => void;
	needResetList: () => boolean;
};

export function Tags(props: TagsProps) {
	const {
		setBlogList,
		resetBlogList,
		setLoading,
		needResetList,
		showAllTags,
	} = props;

	const {
		tagsState,
		tagsStateRef,
		fetchData,
		resetSelectedTags,
		handleSelectChange,
	} = useTagsData(setBlogList, resetBlogList, setLoading, needResetList);

	return (
		<div className="tags">
			<div className="side-section-title side-tags-title">
				Tags
				<div
					className="show-all"
					onClick={() => {
						showAllTags();
						resetSelectedTags();
					}}
				></div>
			</div>
			<div className="side-tags-main">
				<TagsList
					fetchAll={false}
					tagsState={tagsState}
					fetchData={fetchData}
					handleSelectChange={handleSelectChange}
				/>
			</div>
		</div>
	);
}
