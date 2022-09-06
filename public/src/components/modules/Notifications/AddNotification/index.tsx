import { httpsCallable } from "firebase/functions";
import { createContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Select } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes } from "react-icons/fa";
import { functions } from "../../../../firebase";
import GameNotification from "./GameNotification";
import StreamerNotification from "./StreamerNotification";

const types: Record<string, { type: string; component: JSX.Element | null }> = {
	streamer: {
		type: "streamer",
		component: <StreamerNotification />,
	},
	// game: {
	// 	type: "game",
	// 	component: <GameNotification />,
	// },
	// streamerAndGame: {
	// 	type: "streamerAndGame",
	// 	component: null,
	// },
};

export const AddNotificationContext = createContext<{
	onTopicSelected: (topic: string) => void;
}>({
	onTopicSelected() {},
});

export default function AddNotification({
	open,
	toggleModal,
	fcmToken,
}: {
	open: boolean;
	toggleModal: () => void;
	fcmToken: string;
}) {
	const { t } = useTranslation();
	const [selectedType, setSelectedType] = useState(Object.keys(types)[0]);
	const selectedChannel = useRef("");
	const [isSubscribing, setIsSubscribing] = useState(false);

	const subscribeToTopic = async () => {
		setIsSubscribing(true);
		console.log("Subscribing to", selectedChannel.current);

		await httpsCallable(
			functions,
			"subscribeToTopic"
		)({ token: fcmToken, topic: selectedChannel.current });
		setIsSubscribing(false);
		toggleModal();
	};

	return (
		<Modal open={open} onClickBackdrop={toggleModal}>
			<Modal.Header>{t("notifications.add.title")}</Modal.Header>
			<Modal.Body className="items-center flex flex-col gap-4">
				<Select
					className="grow"
					value={selectedType}
					onChange={setSelectedType}>
					{Object.values(types).map((e) => (
						<Select.Option value={e.type} key={e.type}>
							{t(`notifications.add.types.${e.type}.name`)}
						</Select.Option>
					))}
				</Select>
				<p className="text-center">
					Example:{" "}
					{t(`notifications.add.types.${selectedType}.example`)}
				</p>
				<AddNotificationContext.Provider
					value={{
						onTopicSelected(topic) {
							selectedChannel.current = topic;
							console.log(selectedChannel.current);
						},
					}}>
					{types[selectedType].component}
				</AddNotificationContext.Provider>
			</Modal.Body>
			<Modal.Actions className="justify-between">
				<Button
					color="error"
					variant="outline"
					className="gap-2"
					disabled={isSubscribing}
					onClick={toggleModal}>
					{t("notifications.add.cancel")}
					<FaTimes />
				</Button>
				<Button
					color="primary"
					variant="outline"
					className="gap-2"
					disabled={isSubscribing}
					onClick={subscribeToTopic}
					loading={isSubscribing}>
					{t("notifications.add.add")}
					{!isSubscribing && <FaCheck />}
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
