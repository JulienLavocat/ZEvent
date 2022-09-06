import { httpsCallable } from "firebase/functions";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { functions } from "../../../../firebase";
import GamesSearchInput from "../../../elements/GamesSearchInput/GamesSearchInput";

const GameNotification = forwardRef<{ getTopic: () => string }>(({}, ref) => {
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
			{!currentGame && <GamesSearchInput onSelect={setCurrentGame} />}
		</div>
	);
});

export default GameNotification;
