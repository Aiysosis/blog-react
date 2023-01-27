import { getUrl } from "@/utils/url";
import { Blog } from "@/types/data";
import { formatTime } from "@/utils/time";

import style from "./index.module.scss";

type SerieBlogCardProps = {
	blog: Blog;
	reverse: boolean;
};

export function SerieBlogCard(props: SerieBlogCardProps) {
	const { blog, reverse } = props;
	const { id, title, publishedTime, description, coverSmall } = blog;

	return (
		<div className={style.wrapper}>
			<div
				className={`serie-blog-card ${
					reverse ? "card-reverse" : "card-normal"
				}`}
			>
				<a id={`blog${id}`} className="card-anchor" />
				<div className="card-section-info">
					<div
						className={`card-main ${
							reverse ? "card-main-reverse" : "card-main-normal"
						}`}
					>
						<div className="card-title">{title}</div>
						<div className="card-date">
							{formatTime(publishedTime, "YYYY-MM-DD")}
						</div>
						<div className="card-discription">{description}</div>
					</div>
				</div>
				<div className="card-section-pic">
					<img src={getUrl(coverSmall)} alt="" className="card-pic" />
				</div>
			</div>
		</div>
	);
}
