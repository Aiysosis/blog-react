import { createRef, useEffect, useState } from "react";
import { hardwareAcceleration } from "../../utils/hardwareAcceleration";

type StickyState = {
	style: Record<string, string | number>;
	height: number;
};

type StickyProps = {
	stickyTop: number;
	children?: React.ReactNode;
};

export function Sticky(props: StickyProps) {
	const container = createRef<HTMLDivElement>();
	const placeholder = createRef<HTMLDivElement>();
	const events = ["scroll", "resize"];
	const [state, setState] = useState<StickyState>({
		style: {
			...hardwareAcceleration,
		},
		height: 0,
	});

	const handler = () => {
		const { top, height } = container.current.getBoundingClientRect();
		const { width } = placeholder.current.getBoundingClientRect();

		if (top > props.stickyTop) {
			//* 此时处于正常文档流
			setState({
				style: {
					...hardwareAcceleration,
				},
				height: 0,
			});
		} else {
			//* 需要进行吸顶处理
			setState({
				style: {
					position: "fixed",
					top: `${props.stickyTop}px`,
					width,
					...hardwareAcceleration,
				},
				height: height,
			});
		}
	};

	useEffect(() => {
		//* set up event listeners
		const root = document.getElementById("scroll-container");
		events.forEach(e => {
			root.addEventListener(e, handler);
		}, []);
		return () => {
			//* clean up event listeners
			events.forEach(e => {
				root.removeEventListener(e, handler);
			});
		};
	});

	return (
		<div ref={container}>
			<div
				ref={placeholder}
				style={{ height: state.height, zIndex: -1 }}
			></div>
			<div style={state.style}>{props.children}</div>
		</div>
	);
}
