import { Suspense, useEffect, useRef, useState } from "react";
import { LinkProps, Outlet, useOutlet } from "react-router-dom";
import { Loading } from "../pages/loading";
import { CustomLink } from "./customLink";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./index.scss";
import { RightBar } from "../components/rightBar";
import { useLocation } from "react-router-dom";

function NavLink({ children, to, ...props }: LinkProps) {
	return (
		<CustomLink to={to} {...props}>
			{children}
			<div className="nav-underline"></div>
		</CustomLink>
	);
}

function Layout() {
	const [isTop, setTopState] = useState(true);
	const [rightBarOpen, setRightBarOpen] = useState(false);
	const close = () => setRightBarOpen(false);

	const location = useLocation();
	const nodeRef = useRef(null);
	const currentOutlet = useOutlet();

	useEffect(() => {
		const root = document.getElementById("root");
		root.addEventListener("scroll", e => {
			const distance = (e.target as HTMLElement).scrollTop;

			if (distance > 300) {
				setTopState(false);
			} else {
				setTopState(true);
			}
		});
	}, []);

	return (
		<div className="layout">
			<a href="#blog-top-anchor" id="blog-top-anchor"></a>
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
				<SwitchTransition>
					<CSSTransition
						key={location.pathname}
						timeout={300}
						nodeRef={nodeRef}
						classNames="page"
						unmountOnExit
					>
						<div ref={nodeRef} className="page">
							{currentOutlet}
						</div>
					</CSSTransition>
				</SwitchTransition>
			</div>
			<RightBar
				hasWrapper={true}
				width={320}
				show={rightBarOpen}
				closeFn={close}
				title="Settings"
			></RightBar>
			<div className="right-bottom">
				<CSSTransition
					in={!isTop}
					timeout={300}
					classNames="applied upshow"
				>
					<a href="#blog-top-anchor" className="back-to-top"></a>
				</CSSTransition>
				<div
					className="settings"
					onClick={() => setRightBarOpen(true)}
				></div>
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
