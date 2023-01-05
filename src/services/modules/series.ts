import { Serie, SerieDetail } from "../../types/data";
import service from "../config/axios";

export const getList = () => {
	return service<Serie[]>({
		url: "/series",
		method: "get",
	});
};

export const getRecommandSeries = () => {
	return service<Serie[]>({
		url: "/series/recommand",
		method: "get",
	});
};

export const getById = (id: number) => {
	return service<SerieDetail>({
		url: `/series/${id}`,
		method: "get",
	});
};

export const visitSerie = (id: number) => {
	return service({
		url: `/series/visit/${id}`,
		method: "patch",
	});
};
