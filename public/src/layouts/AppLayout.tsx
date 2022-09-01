import React from "react";
import { Modal } from "react-daisyui";
import { Outlet } from "react-router-dom";
import Navbar from "../components/modules/Navbar/Navbar";
import NewUser from "../components/modules/NewUser/NewUser";
import { useAppSelector } from "../store";

export default function AppLayout() {
	const showNewUser = useAppSelector((state) => state.app.showNewUser);
	console.log(showNewUser);

	return (
		<>
			<Navbar>
				<Outlet />
			</Navbar>
			{showNewUser && <NewUser />}
		</>
	);
}
