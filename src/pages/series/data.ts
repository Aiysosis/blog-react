import { useEffect, useState } from "react";
import API from "../../services";
import { Serie } from "../../types/data";
import { useStateRef } from "../../utils/hooks";

export type SeriesState = {
	list: Serie[];
	loading: boolean;
	hasError: boolean;
};

const initialState: SeriesState = {
	list: [],
	loading: true,
	hasError: false,
};

export function useSeriesData() {
	const [state, setState] = useState(initialState);
	const stateRef = useStateRef(state);

	const fetchData = async () => {
		const res = await API.series.getList().catch(err => {
			console.warn(err);
			setState(state => {
				return {
					...state,
					loading: false,
					hasError: true,
				};
			});
		});
		if (res) {
			setState(state => {
				return {
					...state,
					list: res.data,
					loading: false,
				};
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { state, setState, stateRef };
}
