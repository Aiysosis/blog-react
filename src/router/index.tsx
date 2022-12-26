import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../layout";
import BlogPage from "../pages/blog";
import HomePage from "../pages/home";
import SeriePage from "../pages/series";

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <BlogPage />,
			},
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "/series",
				element: <SeriePage />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
