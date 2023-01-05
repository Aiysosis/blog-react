import service from "../config/axios";
import qs from "qs";
import { Tag } from "../../types/data";

export const getTags = () => {
	return service<Tag[]>({
		url: "/tags",
		method: "get",
	});
};

export const getRecommandTags = () => {
	return service<Tag[]>({
		url: "/tags/recommand",
		method: "get",
	});
};

export const getTagsByIds = (data: Array<number>) => {
	const postData = {
		tags: data,
	};
	return service<Tag[]>({
		url: "/tags/search",
		method: "post",
		data: qs.stringify(postData),
	});
};
