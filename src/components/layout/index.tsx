import { LinkProps, Outlet } from "react-router-dom";
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
				<Outlet />
			</div>
			<div className="page-foot"></div>
		</div>
	);
}

export default Layout;
