import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Loading } from "../pages/loading";
import Layout from "../layout";
import { SerieDetail } from "../pages/serieDetail";

const BlogPage = React.lazy(() => import("../pages/blog"));
const HomePage = React.lazy(() => import("../pages/home"));
const SeriePage = React.lazy(() => import("../pages/series"));
const BlogDetail = React.lazy(() => import("../pages/blogDetail"));

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<Loading />}>
								<BlogPage />
							</Suspense>
						),
					},
					{
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
						index: true,
						element: (
							<Suspense fallback={<Loading />}>
								<SeriePage />
							</Suspense>
						),
					},
					{
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
