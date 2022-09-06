import { ref } from "firebase/database";
import { t } from "i18next";
import React, { useMemo } from "react";
import { Avatar } from "react-daisyui";
import { useObjectVal } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { database } from "../../../firebase";
import { DonationGoal } from "../../../utils/interfaces";
import DonationGoalsListItem from "./DonationGoalsListItem";

export default function DonationGoals() {
	const [donationGoals]: [DonationGoal[] | undefined, any, any] =
		useObjectVal(ref(database, "/donationGoals"));
	const { t } = useTranslation();

	const goals = useMemo(
		() =>
			donationGoals
				?.sort(
					(a, b) =>
						b.donationGoals?.length ||
						0 - a.donationGoals?.length ||
						0
				)
				.map((e) => <DonationGoalsListItem key={e.twitch} {...e} />),
		[donationGoals]
	);

	return <ul>{goals}</ul>;
}
