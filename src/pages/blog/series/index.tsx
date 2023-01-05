import { Fragment, useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/loading";
import API from "../../../services";
import { Serie } from "../../../types/data";

interface SeriesState {
	list: Serie[];
	loading: boolean;
}
function FetchSeries() {
	const [state, setState] = useState<SeriesState>({
		list: [],
		loading: true,
	});

	const fetchData = () => {
		API.series
			.getRecommandSeries()
			.then(res => {
				if (res) {
					setState(state => {
						return {
							...state,
							list: res.data,
						};
					});
				}
			})
			.catch(err => {
				console.warn(err);
			})
			.finally(() => {
				setState(state => {
					return {
						...state,
						loading: false,
					};
				});
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const series = state.list.map(serie => (
		<a className="side-single-serie" key={serie.id}>
			{serie.serieName}
		</a>
	));

	return (
		<Fragment>
			{series}
			{state.loading ? (
				<div className="loading">
					<LoadingComponent />
				</div>
			) : null}
		</Fragment>
	);
}

export function Series() {
	return (
		<div className="series">
			<div className="side-section-title side-series">
				Series
				<div className="show-all"></div>
			</div>
			<div className="side-series-main">
				<FetchSeries />
			</div>
		</div>
	);
}
