import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Game from "./components/modules/Game/Game";
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
				index: true,
			},
			{
				path: "/games/:id",
				element: <Game />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
