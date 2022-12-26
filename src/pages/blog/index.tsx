import { useEffect, useState } from "react";
import { Sticky } from "../../components/sticky";
import API from "../../services";
import { Blog } from "../../types/data";
import { BlogCard } from "./blogCard";
import "./index.scss";

function BlogList() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	let blogElements = blogs.map(blog => (
		<BlogCard blog={blog} key={blog.id} />
	));

	API.blogs.getList(0).then(res => {
		if (res) setBlogs(res.data.blogs);
	});

	useEffect(() => {
		blogElements = blogs.map(blog => (
			<BlogCard blog={blog} key={blog.id} />
		));
	}, [blogs]);
	return <div className="blog-list">{blogElements}</div>;
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
