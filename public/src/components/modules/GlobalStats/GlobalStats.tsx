import { query, ref } from "firebase/database";
import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { database } from "../../../firebase";
import { humanizeNumber } from "../../../utils/humanizeNumber";

const items = [
	"donations",
	"viewersCount",
	"onlineStreams",
	"mostWatchedChannel",
	"mostWatchedGame",
];

export default function GlobalStats() {
	const [data] = useObjectVal<
		Record<string, number | { name: string; viewers: number }>
	>(ref(database, "/stats"));
	const { t } = useTranslation();

	const listItem = (name: string) => {
		if (!data) return null;
		const value = data[name];
		return (
			<li
				className="border-t last:border-b p-3"
				key={`home.stats.${name}`}>
				<h2 className="font-semibold">{t(`home.stats.${name}`)}</h2>
				<p>
					{typeof value === "object"
						? `${value.name} (${humanizeNumber(value.viewers)})`
						: humanizeNumber(value as number, name === "donations")}
				</p>
			</li>
		);
	};

	return (
		<div>
			<ul>{items.map((e) => listItem(e))}</ul>
		</div>
	);
}
