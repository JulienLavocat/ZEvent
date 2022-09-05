import { ref } from "firebase/database";
import { t } from "i18next";
import React from "react";
import { Avatar } from "react-daisyui";
import { useObjectVal } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { database } from "../../../firebase";
import { DonationGoal } from "../../../utils/interfaces";

export default function DonationGoals() {
	const [donationGoals]: [DonationGoal[] | undefined, any, any] =
		useObjectVal(ref(database, "/donationGoals"));
	const { t } = useTranslation();

	return (
		<ul>
			{donationGoals?.map((e) => (
				<li
					key={e.twitch}
					className="p-3 border-t last:border-b first:border-t-0 border-gray-600">
					<a className="flex gap-4">
						<Avatar src={e.profileUrl} shape="circle" size="sm" />
						<div className="grow">
							<p className="text-lg">{e.displayName}</p>
						</div>
						{e.donationGoals && (
							<p>
								{`${e.donationGoals.reduce(
									(p, n) => (p += n.done ? 1 : 0),
									0
								)}/${e.donationGoals.length}`}
							</p>
						)}
						{!e.donationGoals && (
							<p>{t("donation-goals.no-goals")}</p>
						)}
					</a>
				</li>
			))}
		</ul>
	);
}
