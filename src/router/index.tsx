import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Blog from "../pages/blog";
import Home from "../pages/home";
import Serie from "../pages/series";

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Blog />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/series",
				element: <Serie />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default router;
