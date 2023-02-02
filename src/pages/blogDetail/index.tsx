import { Fragment, useEffect, useRef } from "react";
import { formatTime } from "@/utils/time";
import { getUrl } from "@/utils/url";
import { Loading } from "../loading";
import { useData } from "./data";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/markdown.scss";
import "../../styles/prism-onedark.css";
import "./index.scss";
import { useLocationConsumer } from "@/shared/context/location";
import { getRouteObjectByLocation } from "@/router/helper";

function GoBack() {
	const nav = useNavigate();
	const ref = useRef<HTMLDivElement>(null);

	const { from, to } = useLocationConsumer();

	const goBack = () => {
		ref.current.style.display = "none"; // hide button
		if (from === null) {
			nav("/");
		} else {
			const fromId = getRouteObjectByLocation(from);
			const toId = getRouteObjectByLocation(to);
			if (fromId === toId) {
				nav("/"); //相同页面的跳转，选择直接返回
			} else nav(-1);
		}
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

function BlogDetail() {
	const { state } = useData();

	const mnt = useRef(null);

	useEffect(() => {
		if (state.content !== "") {
			(mnt.current as HTMLElement).innerHTML = state.content;
		}
	}, [state.content]);

	//隐藏page-foot
	useEffect(() => {
		const pageFoot = document.getElementById("page-foot");
		pageFoot.style.display = "none";
	}, []);

	if (state.loading) {
		return (
			<div className="blog-detail">
				<Loading />
			</div>
		);
	} else {
		const { coverSmall, title, publishedTime } = state.blogDetail;
		return (
			<div className="blog-detail">
				<GoBack />

				<div className="blog-head">
					<img
						src={getUrl(coverSmall)}
						alt="cover"
						className="cover"
					/>
					<a href="#blog-top-anchor" id="blog-top-anchor"></a>
					<div className="title">{title}</div>
					<div className="time">
						{formatTime(publishedTime, "YYYY-MM-DD")}
					</div>
					<div className="filter"></div>
				</div>
				<div ref={mnt} id="mnt"></div>
				<div className="blog-foot"></div>
			</div>
		);
	}
}

export default BlogDetail;
