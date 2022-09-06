import { httpsCallable } from "firebase/functions";
import {
	createContext,
	ForwardRefExoticComponent,
	MutableRefObject,
	RefAttributes,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button, Modal, Select } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes } from "react-icons/fa";
import { functions } from "../../../../firebase";
import GameNotification from "./GameNotification";
import StreamerNotification from "./StreamerNotification";

const types: Record<
	string,
	{
		type: string;
		Component: ForwardRefExoticComponent<
			RefAttributes<{ getTopic: () => string }>
		>;
		baseNotification: string;
	}
> = {
	streamer: {
		type: "streamer",
		Component: StreamerNotification,
		baseNotification: "online",
	},
	game: {
		type: "game",
		Component: GameNotification,
		baseNotification: "game",
	},
	// streamerAndGame: {
	// 	type: "streamerAndGame",
	// 	component: null,
	// },
};

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
	const [isSubscribing, setIsSubscribing] = useState(false);
	const builderRef = useRef<{ getTopic: () => string }>();

	const subscribeToTopic = async () => {
		const topic = builderRef.current?.getTopic();
		if (!topic) return;
		setIsSubscribing(true);
		console.log("Subscribing to", topic);
		await httpsCallable(
			functions,
			"subscribeToTopic"
		)({ token: fcmToken, topic });
		setIsSubscribing(false);
		toggleModal();
	};

	const NotifBuilder = types[selectedType].Component;

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

				<NotifBuilder
					ref={
						builderRef as MutableRefObject<{
							getTopic: () => string;
						}>
					}
				/>
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
