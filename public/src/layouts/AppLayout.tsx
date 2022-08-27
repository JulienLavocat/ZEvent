import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/modules/Navbar/Navbar";

export default function AppLayout() {
	return (
		<Navbar>
			<Outlet />
		</Navbar>
	);
}
