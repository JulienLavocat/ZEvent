import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Games from "./components/modules/Games/Games";
import GlobalStats from "./components/modules/GlobalStats/GlobalStats";
import Streamers from "./components/modules/Streamers/Streamers";
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
			{
				path: "/streamers",
				element: <Streamers />,
			},

			{
				path: "/games",
				element: <Games />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
