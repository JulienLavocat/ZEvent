import { signInAnonymously } from "firebase/auth";
import React, { useEffect } from "react";
import { Modal } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSpinner } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Navbar from "../components/modules/Navbar/Navbar";
import NewUser from "../components/modules/NewUser/NewUser";
import { auth } from "../firebase";
import { useAppSelector } from "../store";

export default function AppLayout() {
	const showNewUser = useAppSelector((state) => state.app.showNewUser);
	const [user, isAuthLoading] = useAuthState(auth);

	useEffect(() => {
		if (!user && !isAuthLoading) {
			console.log("login");
			signInAnonymously(auth);
		}

		return () => {};
	}, [user]);

	if (!user)
		return (
			<div className="flex items-center bg-base-100 h-screen justify-center">
				<FaSpinner size={32} className="animate-spin" />
			</div>
		);

	return (
		<>
			<Navbar>
				<Outlet />
			</Navbar>
			{showNewUser && <NewUser />}
		</>
	);
}
