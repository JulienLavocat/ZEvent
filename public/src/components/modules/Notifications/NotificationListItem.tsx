import { httpsCallable } from "firebase/functions";
import React from "react";
import { Button } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { functions } from "../../../firebase";

export default function NotificationListItem({
	topic,
	token,
}: {
	topic: string;
	token: string;
}) {
	const { t } = useTranslation();
	const unsubscribeFromTopic = () => {
		return httpsCallable(
			functions,
			"unsubscribeFromTopic"
		)({ token, topic });
	};

	const details = topic.split(".");

	const renderOnline = () => (
		<p>
			{t(`notifications.types.online`)} -{" "}
			{details.length === 1 ? t("notifications.all") : details[1]}
		</p>
	);
	const renderGame = () => (
		<p>
			{t(`notifications.types.game`)} -{" "}
			{details.length === 1 ? t("notifications.all") : details[1]}
		</p>
	);

	return (
		<li className="flex items-center justify-between" key={topic}>
			{details[0] === "online" && renderOnline()}
			{details[0] === "game" && renderGame()}
			<Button onClick={unsubscribeFromTopic}>
				<FaTrash className="text-error" />
			</Button>
		</li>
	);
}
