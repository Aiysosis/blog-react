import { getUrl } from "@/utils/url";
import { Blog } from "@/types/data";
import { formatTime } from "@/utils/time";
import css from "./index.module.scss";

type SerieBlogCardProps = {
	blog: Blog;
	reverse: boolean;
};

export function SerieBlogCard(props: SerieBlogCardProps) {
	const { blog, reverse } = props;
	const { id, title, publishedTime, description, coverSmall } = blog;

	return (
		<div
			className={`${css.serieBlogCard} ${
				reverse ? css.reverse : css.normal
			}`}
		>
			<a id={`blog${id}`} className={css.anchor} />
			<div className={css.sectionInfo}>
				<div
					className={`${css.main} ${
						reverse ? css.mainReverse : css.mainNormal
					}`}
				>
					<div className={css.title}>{title}</div>
					<div className={css.date}>
						{formatTime(publishedTime, "YYYY-MM-DD")}
					</div>
					<div className={css.discription}>{description}</div>
				</div>
			</div>
			<div className={css.sectionPic}>
				<img src={getUrl(coverSmall)} alt="" className={css.pic} />
			</div>
		</div>
	);
}
