import { ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { database } from "../../../firebase";
import { NameViewersPair } from "../../../utils/interfaces";
import GameRenderer from "./GameRenderer";

export default function Games() {
	const [data]: [
		Record<number, NameViewersPair> | null | undefined,
		any,
		any
	] = useObjectVal(ref(database, "/games"));

	return (
		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
			{Object.entries(data || {}).map(([id, data]) => (
				<GameRenderer {...data} key={id} gameId={id} />
			))}
		</div>
	);
}
