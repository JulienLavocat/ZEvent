import { httpsCallable } from "firebase/functions";
import React, { useCallback, useEffect, useState } from "react";
import { functions } from "../../../firebase";
import debounce from "lodash.debounce";
import { Dropdown, Input, Menu } from "react-daisyui";
import AutoComplete from "react-autocomplete";

const searchGamesFunction = httpsCallable(functions, "searchGames");

export default function GamesSearchInput({
	onSelect,
}: {
	onSelect: (gameId: { id: string; name: string; boxArtUrl: string }) => void;
}) {
	const [games, setGames] = useState<
		{ id: string; name: string; boxArtUrl: string }[]
	>([]);
	const [currentValue, setCurrentValue] = useState("");

	const searchGames = (query: string) => {
		if (query.length < 2) {
			setGames([]);
			return;
		}

		searchGamesFunction({ query }).then((r) => setGames(r.data as any));
	};

	const debouncedSearchGames = useCallback(debounce(searchGames, 300), []);

	return (
		<>
			<div className="">
				<Input
					className="w-full rounded-md"
					value={currentValue}
					onChange={(e) => {
						debouncedSearchGames(e.target.value);
						setCurrentValue(e.target.value);
					}}
				/>
			</div>
			<Menu className="box-border bg-base-100 max-h-48 overflow-y-scroll">
				{games.map((e) => (
					<Menu.Item
						key={e.id}
						onClick={() => {
							setCurrentValue(e.name);
							setGames([]);
							onSelect(e);
						}}>
						<div className="flex flex-row items-center gap-4">
							<img
								src={e.boxArtUrl
									.replace("{width}", "120")
									.replace("{height}", "160")}
								className="h-10 "
							/>
							<p>{e.name}</p>
						</div>
					</Menu.Item>
				))}
			</Menu>
		</>
	);
}
