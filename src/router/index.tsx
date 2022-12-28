import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Loading } from "../pages/loading";
import Layout from "../layout";

const BlogPage = React.lazy(() => import("../pages/blog"));
const HomePage = React.lazy(() => import("../pages/home"));
const SeriePage = React.lazy(() => import("../pages/series"));

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: (
					<Suspense fallback={<Loading />}>
						<BlogPage />
					</Suspense>
				),
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
				element: (
					<Suspense fallback={<Loading />}>
						<SeriePage />
					</Suspense>
				),
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
