import { ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { Outlet } from "react-router-dom";
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
		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
			{Object.entries(data || {})
				.sort((a, b) => b[1].viewers - a[1].viewers)
				.map(([id, data]) => (
					<GameRenderer {...data} key={id} gameId={id} />
				))}
		</div>
	);
}
