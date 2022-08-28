import { ref } from "firebase/database";
import React from "react";
import { Avatar } from "react-daisyui";
import { useListVals } from "react-firebase-hooks/database";
import { database } from "../../../firebase";
import { humanizeNumber } from "../../../utils/humanize";
import { StreamInfos } from "../../../utils/interfaces";
import StreamerListItem from "../../elements/StreamerListItem";

export default function Streamers() {
	const [data]: [StreamInfos[], any, any] = useListVals(
		ref(database, "/streamers")
	) as any;

	return (
		<div>
			<ul>
				{data.map((e) => (
					<StreamerListItem {...e} key={e.twitch} />
				))}
			</ul>
		</div>
	);
}
