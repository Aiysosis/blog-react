import { CSSTransition } from "react-transition-group";
import { LoadingComponent } from "../../components/loading";
import { Serie } from "../../types/data";
import { useSeriesData } from "./data";
import "./index.scss";
import { SerieCard } from "./serieCard";

function SerieList(props: { list: Serie[] }) {
	const { list } = props;

	const onEnter = (node: HTMLElement) => {
		node.style.opacity = "0";
	};

	const onEntering = (index: number) => {
		//使闭包存储 index
		return (node: HTMLElement) => {
			const delay = index * 100;
			setTimeout(() => {
				node.style.opacity = "1";
				node.style.animation = "serie-in 0.5s ease";
			}, delay);
		};
	};

	const elements = list.map((serie, index) => {
		const { id } = serie;
		return (
			<CSSTransition
				in={true}
				timeout={0}
				appear={true}
				key={id}
				onEnter={onEnter as any}
				onEntering={onEntering(index) as any}
			>
				<SerieCard serie={serie} />
			</CSSTransition>
		);
	});

	return <div className="series-wrapper">{elements}</div>;
}

function SeriePage() {
	const { state } = useSeriesData();

	return (
		<div className="series">
			<div className="main-container">
				{state.loading ? (
					<div className="loading">
						<LoadingComponent />
					</div>
				) : null}
				<SerieList list={state.list} />
			</div>
		</div>
	);
}

export default SeriePage;
