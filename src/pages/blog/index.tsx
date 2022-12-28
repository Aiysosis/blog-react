import React from "react";
import { Suspense } from "react";
import { Sticky } from "../../components/sticky";
import { Loading } from "../loading";

const BlogsFetch = React.lazy(() => import("./dataFetch"));

import "./index.scss";

function BlogList() {
	return (
		<div className="blog-list">
			<Suspense fallback={<Loading />}>
				<BlogsFetch />
			</Suspense>
		</div>
	);
}

function Profile() {
	return <div className="profile"></div>;
}

function SidebarTags() {
	return <div className="tags"></div>;
}

function SidebarSeries() {
	return <div className="series"></div>;
}

function BlogPage() {
	return (
		<div className="blog">
			<div className="left">
				<BlogList />
			</div>
			<div className="right">
				<div className="sidebar">
					<Profile />
					<Sticky>
						<SidebarTags />
						<SidebarSeries />
					</Sticky>
				</div>
			</div>
		</div>
	);
}

export default BlogPage;
