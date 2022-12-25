import { ActionFunction, LoaderFunction } from "react-router-dom";

export interface APIResponse {
	readonly status: number;
	readonly message: string;
	readonly data: unknown;
}

export type LF = LoaderFunction;
export type AF = ActionFunction;

export interface Tag {
	id: number;
	tagName: string;
	count: number;
}

export interface Blog {
	id: number;
	title: string;
	description: string;
	path: string;
	cover: string;
	coverSmall: string;
	likedNum: number;
	publishedTime: string;
	tags: Array<Tag>;
}

export interface BlogDetail {
	id: number;
	title: string;
	path: string;
	cover: string;
	coverSmall: string;
	description: string;
	visitNum: number;
	publishedTime: string;
	tags: Array<Tag>;
	series: Array<Serie>;
}

export interface Serie {
	id: number; //系列id
	serieName: string; //系列名称
	cover: string;
	coverSmall: string;
	finished: boolean;
	description: string;
	createdTime: string;
}

export interface SerieDetail {
	id: number; //系列id
	serieName: string; //系列名称
	cover: string;
	coverSmall: string;
	blogs: Array<Blog>;
	description: string;
	createdTime: string;
	visitNum: number;
}
