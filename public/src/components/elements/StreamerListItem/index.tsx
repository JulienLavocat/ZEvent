import React from "react";
import { Avatar } from "react-daisyui";
import { humanizeNumber } from "../../../utils/humanize";
import { StreamInfos } from "../../../utils/interfaces";

export default function StreamerListItem({
	display,
	twitch,
	online,
	game,
	viewers,
	title,
	profileUrl,
	url,
	compact = false,
}: StreamInfos & { url?: string; compact?: boolean }) {
	return (
		<li className="p-3 border-t last:border-b first:border-t-0 border-gray-600">
			<a
				className="flex gap-4"
				href={url || `https://twitch.tv/${twitch}`}
				target="_blank"
				rel="noopener noreferrer">
				{!compact ? (
					<>
						<Avatar src={profileUrl} shape="circle" />
						<div className="grow flex flex-col">
							<h2
								className={
									online ? "text-success" : "text-error"
								}>
								{display}
							</h2>
							<p className="grow my-2 text-sm">{title}</p>
							{online && <p>{game}</p>}
						</div>
						<p>{humanizeNumber(viewers)}</p>
					</>
				) : (
					<div className="flex items-center gap-4">
						<Avatar src={profileUrl} shape="circle" size="sm" />
						<p className="text-lg">{display}</p>
					</div>
				)}
			</a>
		</li>
	);
}
