import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sticky } from "../../components/sticky";
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

function Outline(props: { blogs: Blog[] }) {
	const { blogs } = props;
	const elements = blogs.map(blog => {
		return (
			<a className="outline" key={blog.id} href={`#blog${blog.id}`}>
				{blog.title}
			</a>
		);
	});
	return (
		<div className="sidebar-section">
			<div className="side-section-title">Outline</div>
			{elements}
		</div>
	);
}

export function GoBack() {
	const nav = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	const goBack = () => {
		ref.current.style.display = "none";
		nav(-1);
	};

	useEffect(() => {
		setTimeout(() => {
			ref.current.style.opacity = "1";
		}, 300);
	}, []);

	return (
		<div
			ref={ref}
			className="back-wrapper"
			v-show="!hideBack"
			onClick={goBack}
		>
			<div className="back"></div>
			<div className="back-text">Back</div>
		</div>
	);
}

function SerieDetail() {
	const { state } = useSerieDetailData();

	if (!state.serie) {
		return <Loading />;
	}

	const { coverSmall, blogs, serieName, createdTime, description } =
		state.serie;

	return (
		<div className="serie-detail">
			<GoBack />
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
					<Sticky stickyTop={80}>
						<Outline blogs={blogs} />
					</Sticky>
				</div>
			</div>
		</div>
	);
}

export default SerieDetail;
