import { ref } from "firebase/database";
import { t } from "i18next";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Select } from "react-daisyui";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import { AddNotificationContext } from ".";
import { database } from "../../../../firebase";
import { StreamerData } from "../../../../utils/interfaces";

export default function StreamerNotification() {
	const { t } = useTranslation();
	const { onTopicSelected } = useContext(AddNotificationContext);
	const [streamers]: [StreamerData[] | undefined, boolean, any] = useListVals(
		ref(database, "/streamers")
	);
	const sortedList = useMemo(() => {
		const list = (streamers || []).sort((a, b) =>
			a.display < b.display ? -1 : a.display > b.display ? 1 : 0
		);
		list.unshift({
			display: t("notifications.add.online-all"),
			donationGoal: {
				displayName: "",
				donationGoals: [],
				profileUrl: "",
				twitch: "",
			},
			game: "",
			online: false,
			profileUrl: "",
			twitch: "all",
			viewersAmount: {
				formatted: "",
				number: 0,
			},
		});
		return list;
	}, [streamers]);
	const [currentValue, setCurrentValue] = useState("all");

	if (!streamers) return <FaSpinner className="animate-spin" />;

	useEffect(() => {
		onTopicSelected(
			currentValue === "all" ? "online" : `online.${currentValue}`
		);
		return () => {};
	}, [currentValue]);

	return (
		<Select value={currentValue} onChange={setCurrentValue}>
			{sortedList.map((e) => (
				<Select.Option key={e.twitch} value={e.twitch}>
					{e.display}
				</Select.Option>
			))}
		</Select>
	);
}
