import { ref } from "firebase/database";
import React from "react";
import { Avatar } from "react-daisyui";
import { useListVals } from "react-firebase-hooks/database";
import { database } from "../../../firebase";
import { humanizeNumber } from "../../../utils/humanizeNumber";
import { StreamInfos } from "../../../utils/interfaces";

export default function Streamers() {
	const [data]: [StreamInfos[], any, any] = useListVals(
		ref(database, "/streamers")
	) as any;

	return (
		<div>
			<ul>
				{data.map((e) => (
					<li
						className="flex p-3 border-t last:border-b gap-4"
						key={e.twitch}>
						<Avatar src={e.profileUrl} shape="circle" />
						<div className="grow flex flex-col">
							<h2
								className={
									e.online ? "text-success" : "text-error"
								}>
								{e.display}
							</h2>
							<p className="grow my-2 text-sm">{e.title}</p>
							{e.online && <p>{e.game}</p>}
						</div>
						<p>{humanizeNumber(e.viewers)}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
