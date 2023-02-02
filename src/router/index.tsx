import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Loading } from "../pages/loading";
import Layout from "../layout";

const BlogPage = React.lazy(() => import("../pages/blog"));
const HomePage = React.lazy(() => import("../pages/home"));
const SeriePage = React.lazy(() => import("../pages/series"));
const BlogDetail = React.lazy(() => import("../pages/blogDetail"));
const SerieDetail = React.lazy(() => import("../pages/serieDetail"));

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				children: [
					{
						id: "blog",
						index: true,
						element: (
							<Suspense fallback={<Loading />}>
								<BlogPage />
							</Suspense>
						),
					},
					{
						id: "blog-detail",
						path: "blogdetail/:id",
						element: (
							<Suspense fallback={<Loading />}>
								<BlogDetail />
							</Suspense>
						),
					},
				],
			},

			{
				id: "home",
				path: "/home",
				element: (
					<Suspense fallback={<Loading />}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: "/series",
				children: [
					{
						id: "series",
						index: true,
						element: (
							<Suspense fallback={<Loading />}>
								<SeriePage />
							</Suspense>
						),
					},
					{
						id: "serie-detail",
						path: "seriedetail/:id",
						element: (
							<Suspense fallback={<Loading />}>
								<SerieDetail />
							</Suspense>
						),
					},
				],
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
