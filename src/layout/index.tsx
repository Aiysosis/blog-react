import { useRef, useState } from "react";
import { LinkProps, useOutlet } from "react-router-dom";
import { CustomLink } from "./customLink";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./index.scss";
import { RightBar } from "../components/rightBar";
import { useLocation } from "react-router-dom";
import { ScrollContainer } from "./scrollContainer";

function NavLink({ children, to, ...props }: LinkProps) {
	return (
		<CustomLink to={to} {...props}>
			{children}
			<div className="nav-underline"></div>
		</CustomLink>
	);
}

function useRightBarCtrl() {
	const [rightBarState, setRightBarState] = useState(false);
	const close = () => setRightBarState(false);
	const open = () => setRightBarState(true);

	return { rightBarState, close, open };
}

function Layout() {
	const { rightBarState, close, open } = useRightBarCtrl();
	const location = useLocation();
	const nodeRef = useRef(null);
	const currentOutlet = useOutlet();

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
			<ScrollContainer openRightBar={open}>
				<SwitchTransition mode="out-in">
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
			</ScrollContainer>

			<RightBar
				hasWrapper={true}
				width={320}
				show={rightBarState}
				closeFn={close}
				title="Settings"
			></RightBar>
		</div>
	);
}

export default Layout;
