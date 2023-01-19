import "./index.scss";

import { Sticky } from "../../components/sticky";
import { Series } from "./series/index";
import { useData } from "./data";
import { BlogCard } from "./blogCard";
import { LoadingComponent } from "../../components/loading";
import { Tags, TagsList } from "./tags";
import { useRightbar } from "./tags/rightbar";
import { AllTags } from "./tags/allTags";

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
	//* 不要在这里写基本逻辑，只保留调度逻辑和jsx
	const { rightbarState, openRightbar, closeRightbar } = useRightbar();
	const { state, setList, resetList, tagsSearchLoading, needResetList } =
		useData();

	const element = state.list.map(blog => (
		<BlogCard blog={blog} key={blog.id} />
	));

	return (
		<div className="blog">
			<AllTags
				setBlogList={setList}
				setLoading={tagsSearchLoading}
				resetBlogList={resetList}
				needResetList={needResetList}
				rightbarState={rightbarState}
				closeRightbar={closeRightbar}
			/>
			<div className="left">
				<div className="blog-list">
					{element}
					{!state.hasMore ? (
						<div className="no-more">没有更多了 ＜（＾－＾）＞</div>
					) : null}
					{state.loading ? (
						<div className="loading">
							<LoadingComponent />
						</div>
					) : null}
				</div>
			</div>
			<div className="right">
				<div className="sidebar">
					<Profile />
					<Sticky>
						<Tags
							showAllTags={openRightbar}
							setBlogList={setList}
							resetBlogList={resetList}
							setLoading={tagsSearchLoading}
							needResetList={needResetList}
						/>
						<Series />
					</Sticky>
				</div>
			</div>
		</div>
	);
}

export default BlogPage;
