import { doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { getToken } from "firebase/messaging";
import { createContext, useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { setFcmToken } from "../../../features/appSlice";
import { auth, firestore, functions, messaging } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../store";
import AddNotification from "./AddNotification";
import NotificationListItem from "./NotificationListItem";

export default function Notifications() {
	const [hasPermission, setHasPermission] = useState(
		Notification.permission === "granted"
	);
	const { t } = useTranslation();
	const fcmToken = useAppSelector((state) => state.app.user.fcmToken);
	const dispatch = useAppDispatch();
	const [user] = useAuthState(auth);
	const [userData]: [{ topics: string[] } | undefined, boolean, any, any] =
		useDocumentData(doc(firestore, `/users/${user?.uid}`)) as any;
	const [openAddModal, setOpenAddModal] = useState(false);

	const requestPermission = async () => {
		const res = await Notification.requestPermission();
		setHasPermission(res === "granted");
	};

	useEffect(() => {
		if (hasPermission && !fcmToken)
			getToken(messaging, {
				vapidKey:
					"BG0_rZVcqCrSGhSdc6Kye3265dwufMBsOACwA6mjrl8RRG-tlnfdpgaTVPDHOKKHT7wTYdUv69C7GYWOhvhwLnU",
			}).then((r) => {
				dispatch(setFcmToken(r));
				setHasPermission(true);
			});

		return () => {};
	}, [hasPermission, fcmToken]);

	if (!hasPermission)
		return (
			<div className="p-4 text-center text-2xl mt-8">
				<h2 className="mb-4">{t("notifications.no-permission")}</h2>
				<Button color="primary" onClick={requestPermission}>
					{t("notifications.ask-for-permission")}
				</Button>
			</div>
		);

	if (!fcmToken || !user)
		return (
			<div className="flex items-center justify-center mt-16">
				<FaSpinner size={32} className="animate-spin" />
			</div>
		);

	return (
		<div className="p-4 flex flex-col gap-4 items-center">
			<Button
				color="primary"
				className="w-fit"
				onClick={() => setOpenAddModal(!openAddModal)}>
				{t("notifications.add.button")}
			</Button>
			<ul>
				{userData?.topics?.map((e) => (
					<NotificationListItem topic={e} token={fcmToken} />
				))}
			</ul>
			<AddNotification
				fcmToken={fcmToken}
				open={openAddModal}
				toggleModal={() => setOpenAddModal(!openAddModal)}
			/>
		</div>
	);
}
