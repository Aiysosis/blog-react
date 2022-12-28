import { Suspense } from "react";
import { LinkProps, Outlet } from "react-router-dom";
import { Loading } from "../pages/loading";
import { CustomLink } from "./customLink";
import "./index.scss";

function NavLink({ children, to, ...props }: LinkProps) {
	return (
		<CustomLink to={to} {...props}>
			{children}
			<div className="nav-underline"></div>
		</CustomLink>
	);
}

function Layout() {
	return (
		<div className="layout">
			<div className="navbar">
				<div className="nav-left"></div>
				<div className="nav-center"></div>
				<div className="nav-right">
					<NavLink to={"/home"}>Home</NavLink>
					<NavLink to={"/"}>Blogs</NavLink>
					<NavLink to={"/series"}>Series</NavLink>
				</div>
			</div>
			<div className="outlet-main">
				<Suspense fallback={<Loading />}>
					<Outlet />
				</Suspense>
			</div>
			<div className="page-foot">
				<p>Copyright © 2022 Aiysosis. All rights reserved.</p>
				<a href="https://beian.miit.gov.cn/" target="_blank">
					桂ICP备2022007029号
				</a>
			</div>
		</div>
	);
}

export default Layout;
