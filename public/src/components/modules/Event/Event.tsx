import React, { useState } from "react";
import { Avatar, Tabs } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Event as EventModel, StreamInfos } from "../../../utils/interfaces";
import StreamerListItem from "../../elements/StreamerListItem";

export default function Event() {
	const { event } = useAppSelector((state) => state.event);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] =
		useState<keyof Pick<EventModel, "participants" | "organizers">>(
			"organizers"
		);

	if (!event) {
		navigate("/events");
	}

	return (
		<div>
			<Tabs
				variant="bordered"
				value={currentTab}
				onChange={setCurrentTab}>
				<Tabs.Tab
					key="organizers"
					value="organizers"
					className="grow h-[inherit] leading-[inherit] p-3">
					{t("event.organizers")}
				</Tabs.Tab>
				<Tabs.Tab
					key="participants"
					value="participants"
					className="grow h-[inherit] leading-[inherit] p-3">
					{t("event.participants")}
				</Tabs.Tab>
			</Tabs>
			{event && (
				<ul>
					{event[currentTab].map((e) => (
						<StreamerListItem
							{...(e as StreamInfos)}
							compact
							key={`${currentTab}.${e.profileUrl}`}
						/>
					))}
				</ul>
			)}
		</div>
	);
}
