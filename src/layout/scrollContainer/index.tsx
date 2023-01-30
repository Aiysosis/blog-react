import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import css from "./index.module.scss";

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

	const {
		scrollContainer,
		pageMain,
		rightBottom,
		backToTop,
		settings,
		pageFoot,
	} = css;
	return (
		<div ref={ref} className={scrollContainer} id="scroll-container">
			<div className={pageMain}>
				<a href="#scroll-top-anchor" id="scroll-top-anchor"></a>
				<div className={rightBottom}>
					<CSSTransition
						in={!isTop}
						timeout={300}
						classNames="applied upshow"
					>
						<a href="#scroll-top-anchor" className={backToTop}></a>
					</CSSTransition>
					<div
						className={settings}
						onClick={() => {
							openRightBar();
						}}
					></div>
				</div>
				{children}
			</div>
			<div className={pageFoot} id="page-foot">
				<p>Copyright © 2022 Aiysosis. All rights reserved.</p>
				<a href="https://beian.miit.gov.cn/" target="_blank">
					桂ICP备2022007029号
				</a>
			</div>
		</div>
	);
}
