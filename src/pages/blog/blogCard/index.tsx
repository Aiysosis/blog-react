import { Link } from "react-router-dom";
import { Blog, Tag } from "../../../types/data";
import css from "./index.module.scss";

function Tags(props: { tags: Tag[] }) {
	const { tags } = props;

	const renderTags = tags.map(tag => (
		<div className={css.tag} key={tag.id}>
			{tag.tagName}
		</div>
	));

	return <div className={css.tags}>{renderTags}</div>;
}

function BlogCard(props: { blog: Blog }) {
	const { blog } = props;
	const { title, publishedTime, tags, description, id } = blog;
	return (
		<div className={css.blogCard}>
			<div className={css.title}>{title}</div>
			<div className={css.date}>{publishedTime}</div>
			<Tags tags={tags} />
			<div className={css.info}>{description}</div>
			<Link className={css.btn} to={`/blogdetail/${id}`}>
				start
			</Link>
			<div className={css.spr}>
				<div className={css.sprLine}></div>
			</div>
		</div>
	);
}

export default BlogCard;
