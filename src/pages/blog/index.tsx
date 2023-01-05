import { Sticky } from "../../components/sticky";
import { Series } from "./series";
import BlogsFetch from "./dataFetch";

import "./index.scss";
import { Tags } from "./tags";

function BlogList() {
	return (
		<div className="blog-list">
			<BlogsFetch />
		</div>
	);
}

function Profile() {
	return (
		<div className="profile">
			<div className="side-section-title">About Me</div>
			<div className="side-section-main">
				Hi！我叫Aiysosis。这个名字可能并不常见，因为它完全是由我自己创造的。很多年前的某天，我受够了“用户名已被注册”的烦恼，所以我决定创造一个不会重复的名字，于是，Aiysosis诞生了。如果你在Github，Gitee，稀土掘金，CSDN看到了这个名字，那大概率就是我了~
				当然，我是个正直的人，如果你在一些奇怪的地方看到了这个名字，相信我，那不是我！毕竟我是个正直的人（确信）
			</div>
		</div>
	);
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
						<Tags />
						<Series />
					</Sticky>
				</div>
			</div>
		</div>
	);
}

export default BlogPage;
