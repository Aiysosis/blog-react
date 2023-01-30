import css from "./index.module.scss";

export function Loading() {
	const { loadingPage, box, dot } = css;
	const dots = new Array(5).fill(0).map((val, idx) => {
		return <div key={idx} className={dot}></div>;
	});

	return (
		<div className={loadingPage}>
			<div className={box}>{dots}</div>
		</div>
	);
}
