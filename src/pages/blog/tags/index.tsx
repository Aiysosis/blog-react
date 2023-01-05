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
			<input type="checkbox" id={props.id.toString()} />
			<label
				htmlFor={props.id.toString()}
				className="side-single-tag"
			>{`${props.tagName}(${props.count})`}</label>
		</div>
	);
}

function FetchTags() {
	const [state, setState] = useState<TagsState>({
		list: [],
		loading: true,
	});

	const dataFetch = () => {
		API.tags
			.getRecommandTags()
			.then(res => {
				if (res) {
					console.log(res.data);

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

export function Tags() {
	return (
		<div className="tags">
			<div className="side-section-title side-tags-title">
				Tags
				<div className="show-all"></div>
			</div>
			<div className="side-tags-main">
				<FetchTags />
			</div>
		</div>
	);
}
