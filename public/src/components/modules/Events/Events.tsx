import { ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Card, Tabs } from "react-daisyui";
import Tab from "react-daisyui/dist/Tabs/Tab";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEvent } from "../../../features/eventSlice";
import { database } from "../../../firebase";
import { humanizeDate, humanizeHours } from "../../../utils/humanize";
import { Event } from "../../../utils/interfaces";

export default function Events() {
	const [data]: [Event[] | null | undefined, any, any] = useListVals(
		ref(database, "/events")
	);
	const [tabs, setTabs] = useState<{ value: Date; content: Event[] }[]>([]);
	const [tabIndex, setTabIndex] = useState(0);
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const days = new Set<string>();

		data?.map<Omit<Event, "start"> & { start: Date }>((e) => ({
			...e,
			start: new Date(e.start),
		}))
			.sort((a, b) => a.start.getTime() - b.start.getTime())
			.forEach((e) => {
				if (days.has(e.start.toISOString())) return;
				days.add(e.start.toISOString());
				e.start.setHours(0, 0, 0, 0);
			});

		const tabs = [...days].map((e) => ({
			value: new Date(e),
			content:
				data?.filter((event) => {
					const date = new Date(event.start);
					date.setHours(0, 0, 0, 0);
					const dayDate = new Date(e);
					dayDate.setHours(0, 0, 0, 0);

					return date.getTime() === dayDate.getTime();
				}) || [],
		}));
		setTabs(tabs);
	}, [data]);

	return (
		<div>
			<Tabs
				onChange={(e) => setTabIndex(e)}
				variant="bordered"
				value={tabIndex}
				className="flex-nowrap">
				{tabs.map((e, i) => (
					<Tabs.Tab
						key={e.value.getTime()}
						value={i}
						className="grow h-[inherit] leading-[inherit] p-3">
						{humanizeDate(e.value)}
					</Tabs.Tab>
				))}
			</Tabs>
			{tabs[tabIndex] && (
				<div className="p-2 flex flex-col gap-2">
					{tabs[tabIndex].content.map((ev, i) => (
						<div
							onClick={() => {
								dispatch(setEvent(ev));
								navigate("/event");
							}}
							className="bg-black p-4 rounded-md shadow flex flex-col cursor-pointer"
							key={ev.title + i}>
							<h2 className="text-lg mb-2">{ev.title}</h2>
							<p>
								{humanizeHours(new Date(ev.start))} -{" "}
								{humanizeHours(new Date(ev.end))}
							</p>
							<p className="text-sm mt-1">
								{ev.organizers.map((e) => e.display).join(", ")}
							</p>
							<Button
								color="ghost"
								className="w-fit self-end text-primary">
								{t("events.event.details")}
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
