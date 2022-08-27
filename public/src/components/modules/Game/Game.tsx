import { equalTo, orderByChild, query, ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { database } from "../../../firebase";
import { StreamInfos } from "../../../utils/interfaces";
import StreamerListItem from "../../elements/StreamerListItem";

export default function Game() {
	const params = useParams();
	const navigate = useNavigate();
	const [data]: [StreamInfos[] | null | undefined, any, any] = useObjectVal(
		query(
			ref(database, "/streamers"),
			orderByChild("gameId"),
			equalTo(params.id || "")
		)
	);

	if (!params.id) navigate("/games");

	return (
		<ul>
			{Object.values(data || {}).map((e) => (
				<StreamerListItem {...e} key={e.profileUrl} />
			))}
		</ul>
	);
}
