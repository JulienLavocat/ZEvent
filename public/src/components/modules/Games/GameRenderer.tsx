import React from "react";
import { humanizeNumber } from "../../../utils/humanize";
import { NameViewersPair } from "../../../utils/interfaces";

export default function GameRenderer({
	name,
	viewers,
	gameId,
}: NameViewersPair & { gameId: string }) {
	return (
		<a className="p-4" href={"/games/" + gameId}>
			<img
				src={`https://static-cdn.jtvnw.net/ttv-boxart/${gameId}-285x380.jpg`}
			/>
			<h2>{name}</h2>
			<p>{humanizeNumber(viewers)} viewers</p>
		</a>
	);
}
