import { Link } from "react-router-dom";
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
	const { title, publishedTime, tags, description, id } = blog;

	return (
		<div className="blog-card">
			<div className="title">{title}</div>
			<div className="date">{publishedTime}</div>
			<Tags tags={tags} />
			<div className="info">{description}</div>
			<Link to={`/blogdetail/${id}`}>start</Link>
			<div className="separator-container">
				<div className="separator"></div>
			</div>
		</div>
	);
}
