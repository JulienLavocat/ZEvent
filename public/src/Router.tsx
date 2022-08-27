import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import GlobalStats from "./components/modules/GlobalStats/GlobalStats";
import AppLayout from "./layouts/AppLayout";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <GlobalStats />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
