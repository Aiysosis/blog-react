import { Fragment, useEffect, useRef } from "react";
import { formatTime } from "@/utils/time";
import { getUrl } from "@/utils/url";
import { Loading } from "../loading";
import { useData } from "./data";
import { Link } from "react-router-dom";
import "../../styles/markdown.scss";
import "../../styles/prism-onedark.css";
import "./index.scss";

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
				<Link to={"/"} className="back-wrapper">
					<div className="back"></div>
					<div className="back-text">Back</div>
				</Link>

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
