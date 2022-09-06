import React from "react";
import { Avatar } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setDonationGoal } from "../../../features/appSlice";
import { useAppDispatch } from "../../../store";
import { DonationGoal } from "../../../utils/interfaces";

export default function DonationGoalsListItem(props: DonationGoal) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const selectItem = () => {
		dispatch(setDonationGoal(props));
		navigate("/donation-goal");
	};

	return (
		<li
			className="p-3 border-t last:border-b first:border-t-0 border-gray-600 cursor-pointer"
			onClick={selectItem}>
			<a className="flex gap-4">
				<Avatar src={props.profileUrl} shape="circle" size="sm" />
				<div className="grow">
					<p className="text-lg">{props.displayName}</p>
				</div>
				{props.donationGoals && (
					<p>
						{`${props.donationGoals.reduce(
							(p, n) => (p += n.done ? 1 : 0),
							0
						)}/${props.donationGoals.length}`}
					</p>
				)}
				{!props.donationGoals && <p>{t("donation-goals.no-goals")}</p>}
			</a>
		</li>
	);
}
