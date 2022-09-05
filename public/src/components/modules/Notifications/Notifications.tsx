import { httpsCallable } from "firebase/functions";
import { getToken } from "firebase/messaging";
import { useEffect, useRef, useState } from "react";
import { Button, Input, InputGroup } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	useCollectionDataOnce,
	useDocumentData,
	useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { setFcmToken } from "../../../features/appSlice";
import { auth, firestore, functions, messaging } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../store";
import { collection, doc } from "firebase/firestore";

export default function Notifications() {
	const [hasPermission, setHasPermission] = useState(
		Notification.permission === "granted"
	);
	const { t } = useTranslation();
	const fcmToken = useAppSelector((state) => state.app.user.fcmToken);
	const dispatch = useAppDispatch();
	const [user, isAuthLoading] = useAuthState(auth);
	const [userData, loading]: [
		{ topics: string[] } | undefined,
		boolean,
		any,
		any
	] = useDocumentData(doc(firestore, `/users/${user?.uid}`)) as any;
	const eventNameRef = useRef<HTMLInputElement | null>(null);
	const [eventName, setEventName] = useState("");

	const requestPermission = async () => {
		const res = await Notification.requestPermission();
		setHasPermission(res === "granted");
	};

	const subscribeToTopic = (topic: string) => {
		return httpsCallable(
			functions,
			"subscribeToTopic"
		)({ token: fcmToken, topic });
	};

	const unsubscribeFromTopic = (topic: string) => {
		return httpsCallable(
			functions,
			"unsubscribeFromTopic"
		)({ token: fcmToken, topic });
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
		<div className="p-4 flex flex-col gap-4 justify-center">
			<InputGroup>
				<span>Event name</span>
				<Input
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
					type="text"></Input>
				<Button
					color="success"
					disabled={eventName.length < 2}
					onClick={async () => {
						await subscribeToTopic(eventName);
						setEventName("");
					}}>
					Subscribe
				</Button>
			</InputGroup>
			<ul>
				{userData?.topics?.map((e) => (
					<li className="flex items-center justify-between" key={e}>
						<p>{e}</p>
						<Button onClick={() => unsubscribeFromTopic(e)}>
							<FaTrash className="text-error" />
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
