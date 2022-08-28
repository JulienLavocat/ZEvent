import React, { useState } from "react";
import { Avatar, Button, Navbar, Tabs } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
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

	const returnToEvents = () => {
		navigate("/events");
	};

	if (!event) {
		returnToEvents();
	}

	return (
		<div className="h-screen w-screen">
			<Navbar className="border-b border-gray-600">
				<Button shape="square" color="ghost" onClick={returnToEvents}>
					<FaArrowLeft size={24} />
				</Button>
				<h1 className="absolute left-1/2 right-1/2 w-max -translate-x-1/2 text-lg">
					{event?.title}
				</h1>
			</Navbar>
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
