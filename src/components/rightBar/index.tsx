import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

type RightBarProps = {
	show: boolean;
	hasWrapper: boolean;
	width: number;
	closeFn: () => void;
	//slots
	title?: string;
	headRight?: React.ReactNode;
	children?: React.ReactNode;
};

type MainProps = {
	show: boolean;
	width: number;
	closeFn: () => void; //set show to false -> CSSTransition in
	closeWrapper: () => void; //set outer show to false
	title?: string;
	headRight?: React.ReactNode;
	children?: React.ReactNode;
};

function SideMain(props: MainProps) {
	return (
		<CSSTransition
			in={props.show}
			timeout={300}
			classNames="slide"
			onExited={props.closeWrapper}
			unmountOnExit
		>
			<div
				className="right-bar"
				style={{ width: props.width }}
				onClick={e => e.stopPropagation()}
			>
				<div className="head">
					<div className="close" onClick={props.closeFn}></div>
					<div className="title">{props.title}</div>
					<div className="empty">{props.headRight}</div>
				</div>
				<div className="content">{props.children}</div>
			</div>
		</CSSTransition>
	);
}

export function RightBar(props: RightBarProps) {
	if (!props.show) return null;
	const [showInner, setShowInner] = useState(false);
	const closeInner = () => {
		setShowInner(false);
	};

	//mount
	useEffect(() => {
		setShowInner(true);
	}, []);

	if (props.hasWrapper) {
		return (
			<div className="right-bar-wrapper" onClick={closeInner}>
				<SideMain
					show={showInner}
					width={props.width}
					closeFn={closeInner}
					closeWrapper={props.closeFn}
					title={props.title}
					headRight={props.headRight}
					children={props.children}
				></SideMain>
			</div>
		);
	} else {
		return (
			<SideMain
				show={showInner}
				width={props.width}
				closeFn={closeInner}
				closeWrapper={props.closeFn}
				title={props.title}
				headRight={props.headRight}
				children={props.children}
			></SideMain>
		);
	}
}
