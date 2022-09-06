import { httpsCallable } from "firebase/functions";
import { t } from "i18next";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import { functions } from "../../../../firebase";
import GamesSearchInput from "../../../elements/GamesSearchInput/GamesSearchInput";

const GameNotification = forwardRef<{ getTopic: () => string }>(({}, ref) => {
	const { t } = useTranslation();
	const [currentGame, setCurrentGame] = useState<{
		id: string;
		name: string;
		boxArtUrl: string;
	} | null>(null);

	useImperativeHandle(ref, () => ({
		getTopic() {
			const topic = currentGame ? `game.${currentGame.id}` : "game";
			setCurrentGame(null);
			return topic;
		},
	}));

	return (
		<div>
			{!currentGame && (
				<>
					<GamesSearchInput onSelect={setCurrentGame} />
					<p>{t("notifications.add.types.game.empty-for-all")}</p>
				</>
			)}
			<p className="mt-4">
				{t("notifications.add.types.game.game-selected", {
					game:
						currentGame?.name ||
						t("notifications.add.types.game.all"),
				})}
			</p>
		</div>
	);
});

export default GameNotification;
