import { Blog } from "../../../types/data";
import { formatTime } from "../../../utils/time";
import { getUrl } from "../../../utils/url";

import "./index.scss";

type SerieBlogCardProps = {
	blog: Blog;
	reverse: boolean;
};

export function SerieBlogCard(props: SerieBlogCardProps) {
	const { blog, reverse } = props;
	const { id, title, publishedTime, description, coverSmall } = blog;

	return (
		<div
			className={`serie-blog-card ${
				reverse ? "flex-reverse" : "flex-normal"
			}`}
		>
			<a id={`blog${id}`} className="anchor" />
			<div className="section-info">
				<div
					className={`main ${
						reverse ? "main-reverse" : "main-normal"
					}`}
				>
					<div className="title">{title}</div>
					<div className="date">
						{formatTime(publishedTime, "YYYY-MM-DD")}
					</div>
					<div className="discription">{description}</div>
				</div>
			</div>
			<div className="section-pic">
				<img src={getUrl(coverSmall)} alt="" className="pic" />
			</div>
		</div>
	);
}
