import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Event from "./components/modules/Event/Event";
import Events from "./components/modules/Events/Events";
import Game from "./components/modules/Game/Game";
import Games from "./components/modules/Games/Games";
import GlobalStats from "./components/modules/GlobalStats/GlobalStats";
import Streamers from "./components/modules/Streamers/Streamers";
import AppLayout from "./layouts/AppLayout";

export const items: {
	name: string;
	path: string;
	element: React.ReactNode;
	isVisible: boolean;
}[] = [
	{
		name: "globalStats",
		path: "/",
		element: <GlobalStats />,
		isVisible: true,
	},
	{
		name: "streamers",
		path: "/streamers",
		element: <Streamers />,
		isVisible: true,
	},
	{
		name: "games",
		path: "/games",
		element: <Games />,
		isVisible: true,
	},
	{
		name: "",
		path: "/games/:id",
		element: <Game />,
		isVisible: false,
	},
	{
		name: "events",
		path: "/events",
		element: <Events />,
		isVisible: true,
	},
	{
		name: "",
		path: "/event",
		element: <Event />,
		isVisible: false,
	},
];

const routes: RouteObject[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: items.map((e) => ({ path: e.path, element: e.element })),
	},
];

export default function Router() {
	return useRoutes(routes);
}
