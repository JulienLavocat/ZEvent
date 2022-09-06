import { ref } from "firebase/database";
import {
	forwardRef,
	useContext,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { Select } from "react-daisyui";
import { useListVals } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import { database } from "../../../../firebase";
import { StreamerData } from "../../../../utils/interfaces";

export default forwardRef<{ getTopic: () => string }>(({}, reactRef) => {
	const { t } = useTranslation();
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

	useImperativeHandle(reactRef, () => ({
		getTopic() {
			return currentValue === "all" ? "online" : `online.${currentValue}`;
		},
	}));

	if (!streamers) return <FaSpinner className="animate-spin" />;

	return (
		<Select value={currentValue} onChange={setCurrentValue}>
			{sortedList.map((e) => (
				<Select.Option key={e.twitch} value={e.twitch}>
					{e.display}
				</Select.Option>
			))}
		</Select>
	);
});
