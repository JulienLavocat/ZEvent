import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGame } from "../../../features/appSlice";
import { humanizeNumber } from "../../../utils/humanize";
import { NameViewersPair } from "../../../utils/interfaces";

export default function GameRenderer({
	name,
	viewers,
	gameId,
}: NameViewersPair & { gameId: string }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClick = () => {
		dispatch(setGame({ name, gameId }));
		navigate("/game");
	};

	return (
		<div className="p-4 cursor-pointer" onClick={onClick}>
			<img
				src={`https://static-cdn.jtvnw.net/ttv-boxart/${gameId}-285x380.jpg`}
			/>
			<h2>{name}</h2>
			<p>{humanizeNumber(viewers)} viewers</p>
		</div>
	);
}
