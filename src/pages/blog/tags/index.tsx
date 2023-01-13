import { Fragment, useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/loading";
import API from "../../../services";
import { Tag } from "../../../types/data";

interface TagsState {
	list: Tag[];
	loading: boolean;
}

type SingleTagProps = Tag;

function SingleTag(props: SingleTagProps) {
	return (
		<div>
			<input type="checkbox" value={props.id} id={props.id.toString()} />
			<label
				htmlFor={props.id.toString()}
				className="side-single-tag"
			>{`${props.tagName}(${props.count})`}</label>
		</div>
	);
}

type FetchTagsProps = {
	fetchAll: boolean;
};

export function FetchTags(props: FetchTagsProps) {
	const [state, setState] = useState<TagsState>({
		list: [],
		loading: true,
	});

	const dataFetch = () => {
		const promise = props.fetchAll
			? API.tags.getTags()
			: API.tags.getRecommandTags();

		promise
			.then(res => {
				if (res) {
					setState(state => {
						return {
							...state,
							list: res.data,
						};
					});
				}
			})
			.catch(err => {
				console.warn(err);
			})
			.finally(() => {
				setState(state => {
					return {
						...state,
						loading: false,
					};
				});
			});
	};

	useEffect(() => {
		dataFetch();
	}, []);

	const tags = state.list.map(tag => (
		<SingleTag
			id={tag.id}
			tagName={tag.tagName}
			count={tag.count}
			key={tag.id}
		/>
	));

	return (
		<Fragment>
			{tags}
			{state.loading ? (
				<div className="loading">
					<LoadingComponent />
				</div>
			) : null}
		</Fragment>
	);
}

type TagsProps = {
	showAllTags: () => void;
};

export function Tags(props: TagsProps) {
	return (
		<div className="tags">
			<div className="side-section-title side-tags-title">
				Tags
				<div className="show-all" onClick={props.showAllTags}></div>
			</div>
			<div className="side-tags-main">
				<FetchTags fetchAll={false} />
			</div>
		</div>
	);
}
