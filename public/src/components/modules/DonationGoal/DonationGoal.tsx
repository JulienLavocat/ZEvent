import React, { useState } from "react";
import { Button, Checkbox, Navbar, Swap, Tabs } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { humanizeCurrency, humanizeDateTime } from "../../../utils/humanize";

export default function DonationGoal() {
	const goal = useAppSelector((state) => state.app.donationGoal);
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] = useState("simple");
	const { t } = useTranslation();

	const returnToGoals = () => {
		navigate("/donation-goals");
	};

	return (
		<div className="min-h-screen max-w-[100vw]">
			<Navbar className="border-b border-gray-600">
				<Button shape="square" color="ghost" onClick={returnToGoals}>
					<FaArrowLeft size={24} />
				</Button>
				<h1 className="absolute left-1/2 right-1/2 w-max -translate-x-1/2 text-lg">
					{goal?.displayName}
				</h1>
			</Navbar>
			<Tabs
				variant="bordered"
				value={currentTab}
				onChange={setCurrentTab}>
				<Tabs.Tab
					key="simple"
					value="simple"
					className="grow h-[inherit] leading-[inherit] p-3">
					{t("donation-goals.simple")}
				</Tabs.Tab>
				<Tabs.Tab
					key="recurent"
					value="recurent"
					className="grow h-[inherit] leading-[inherit] p-3">
					{t("donation-goals.recurent")}
				</Tabs.Tab>
				<Tabs.Tab
					key="equal"
					value="equal"
					className="grow h-[inherit] leading-[inherit] p-3">
					{t("donation-goals.equal")}
				</Tabs.Tab>
			</Tabs>
			{goal?.donationGoals && (
				<ul className="pb-4">
					{goal?.donationGoals
						.filter((e) => e.type === currentTab)
						?.map((e) => (
							<div className="flex p-3 border-t last:border-b first:border-t-0 border-gray-600 justify-between items-center gap-4">
								<div className="h-full">
									<p>{humanizeCurrency(e.amount)}</p>
									<p>{e.name}</p>
									{e.achievedAt && (
										<small>
											{t("donation-goals.achievedAt", {
												achievedAt: humanizeDateTime(
													new Date(e.achievedAt)
												),
											})}
										</small>
									)}
								</div>
								<Checkbox
									className="cursor-default"
									color="primary"
									size="lg"
									checked={!!e.achievedAt}
								/>
							</div>
						))}
				</ul>
			)}
		</div>
	);
}
