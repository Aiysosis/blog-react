import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

type ScrollContainerProps = {
	children?: React.ReactNode;
	openRightBar: Function;
};

export function ScrollContainer(props: ScrollContainerProps) {
	const { children, openRightBar } = props;
	const ref = useRef<HTMLDivElement>(null);

	const [isTop, setIsTop] = useState(true);

	useEffect(() => {
		const scrollEl = ref.current;
		scrollEl.addEventListener("scroll", e => {
			const distance = (e.target as HTMLElement).scrollTop;
			if (distance > 300) {
				setIsTop(false);
			} else {
				setIsTop(true);
			}
		});
	}, []);

	return (
		<div ref={ref} className="scroll-container" id="scroll-container">
			<div className="page-main">
				<a href="#scroll-top-anchor" id="scroll-top-anchor"></a>
				<div className="right-bottom">
					<CSSTransition
						in={!isTop}
						timeout={300}
						classNames="applied upshow"
					>
						<a
							href="#scroll-top-anchor"
							className="back-to-top"
						></a>
					</CSSTransition>
					<div
						className="settings"
						onClick={() => {
							openRightBar();
						}}
					></div>
				</div>
				{children}
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
