import { equalTo, orderByChild, query, ref } from "firebase/database";
import React from "react";
import { Button, Navbar } from "react-daisyui";
import { useObjectVal } from "react-firebase-hooks/database";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { database } from "../../../firebase";
import { useAppSelector } from "../../../store";
import { StreamInfos } from "../../../utils/interfaces";
import StreamerListItem from "../../elements/StreamerListItem";

export default function Game() {
	const navigate = useNavigate();
	const game = useAppSelector((state) => state.event.game);
	const [data]: [StreamInfos[] | null | undefined, any, any] = useObjectVal(
		query(
			ref(database, "/streamers"),
			orderByChild("gameId"),
			equalTo(game?.gameId || "")
		)
	);

	const returnToGames = () => {
		navigate("/games");
	};

	if (!game) returnToGames();

	return (
		<div className="h-screen w-screen">
			<Navbar className="border-b border-gray-600">
				<Button shape="square" color="ghost" onClick={returnToGames}>
					<FaArrowLeft size={24} />
				</Button>
				<h1 className="absolute left-1/2 right-1/2 w-max -translate-x-1/2 text-lg">
					{game?.name}
				</h1>
			</Navbar>
			<ul>
				{Object.values(data || {}).map((e) => (
					<StreamerListItem {...e} key={e.profileUrl} />
				))}
			</ul>
		</div>
	);
}
