import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services";
import { SerieDetail } from "../../types/data";

type SerieDetailState = {
	serie: SerieDetail;
	loading: boolean;
};

const initialState: SerieDetailState = {
	serie: null,
	loading: true,
};

export function useSerieDetailData() {
	const { id } = useParams();
	const [state, setState] = useState(initialState);

	const fetchData = async () => {
		const res = await API.series.getById(+id).catch(err => {
			console.warn(err);
		});

		if (res) {
			setState({
				serie: res.data,
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { state, setState };
}
