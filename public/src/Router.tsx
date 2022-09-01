import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Event from "./components/modules/Event/Event";
import Events from "./components/modules/Events/Events";
import Game from "./components/modules/Game/Game";
import Games from "./components/modules/Games/Games";
import GlobalStats from "./components/modules/GlobalStats/GlobalStats";
import Notifications from "./components/modules/Notifications/Notifications";
import Streamers from "./components/modules/Streamers/Streamers";
import AppLayout from "./layouts/AppLayout";

interface PageDetails {
	name: string;
	path: string;
	element: React.ReactNode;
	isVisible: boolean;
}
[];

export const items: PageDetails[] = [
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
		name: "events",
		path: "/events",
		element: <Events />,
		isVisible: true,
	},
	{
		name: "notifications",
		path: "/notifications",
		element: <Notifications />,
		isVisible: true,
	},
];

const specialCases: PageDetails[] = [
	{
		name: "",
		path: "/event",
		element: <Event />,
		isVisible: false,
	},
	{
		name: "",
		path: "/game",
		element: <Game />,
		isVisible: false,
	},
];

const routes: RouteObject[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: items.map((e) => ({ path: e.path, element: e.element })),
	},
	...specialCases.map((e) => ({ path: e.path, element: e.element })),
];

export default function Router() {
	return useRoutes(routes);
}
