import service from "../config/axios";
import { Blog, BlogDetail } from "../../types/data";

export const getList = (skip: number) => {
	return service<Blog[]>({
		url: `/blogs/all/${skip}`,
		method: "get",
	});
};

export const getById = (id: number) => {
	return service<BlogDetail>({
		url: `/blogs/${id}`,
		method: "get",
	});
};

export const getContent = (path: string) => {
	return service<string>({
		url: `/files/md?path=${path}`,
		method: "get",
	});
};

export const visitBlog = (id: number) => {
	return service({
		url: `/blogs/visit/${id}`,
		method: "patch",
	});
};
