import { Blog } from "../../types/data";
import { formatTime } from "../../utils/time";
import { getUrl } from "../../utils/url";
import { Loading } from "../loading";
import { useSerieDetailData } from "./data";

import "./index.scss";
import { SerieBlogCard } from "./serieBlogCard";

function BlogList(props: { list: Blog[] }) {
	const { list } = props;

	const elements = list.map((blog, index) => {
		return (
			<SerieBlogCard
				blog={blog}
				reverse={index % 2 !== 0}
				key={blog.id}
			/>
		);
	});

	return <div className="blogs-wrapper">{elements}</div>;
}

export function SerieDetail() {
	const { state } = useSerieDetailData();

	if (!state.serie) {
		return <Loading />;
	}

	const { coverSmall, blogs, serieName, createdTime, description } =
		state.serie;

	return (
		<div className="serie-detail">
			<div className="back-wrapper" v-show="!hideBack">
				<div className="back"></div>
				<div className="back-text">Back</div>
			</div>
			<div className="head">
				<img src={getUrl(coverSmall)} className="pic" />
				<div className="head-filter"></div>
				<div className="head-main">
					<div className="serie-title">{serieName}</div>
					<div className="serie-time">
						Since {formatTime(createdTime, "YYYY-MM-DD")}
					</div>
				</div>
			</div>
			<div className="main">
				<BlogList list={blogs} />
				<div className="sidebar">
					<div className="sidebar-section">
						<div className="side-section-title">Discription</div>
						<div className="side-section-main">{description}</div>
					</div>

					<div className="sidebar-section">
						<div className="side-section-title">Outline</div>
					</div>
				</div>
			</div>
		</div>
	);
}
