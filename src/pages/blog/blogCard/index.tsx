import { Blog, Tag } from "../../../types/data";
import "./index.scss";

function Tags(props: { tags: Tag[] }) {
	const renderTags = props.tags.map(tag => (
		<div className="tag" key={tag.id}>
			{tag.tagName}
		</div>
	));

	return <div className="tags-container">{renderTags}</div>;
}

export function BlogCard(props: { blog: Blog }) {
	const { blog } = props;
	return (
		<div className="blog-card">
			<div className="title">{blog.title}</div>
			<div className="date">{blog.publishedTime}</div>
			<Tags tags={blog.tags} />
			<div className="info">{blog.description}</div>
			<div className="separator-container">
				<div className="separator"></div>
			</div>
		</div>
	);
}
