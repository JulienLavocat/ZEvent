import { Client } from "@elastic/elasticsearch";
import { HelixGameData } from "@twurple/api/lib/api/helix/game/HelixGame";

const GAMES_SEARCH_INDEX = "games_autocomplete";

const elastic = new Client({
	node: process.env.ELASTIC_HOST || "http://localhost:9200",
	auth: {
		username: process.env.ELASTIC_USERNAME || "",
		password: process.env.ELASTIC_PASSWORD || "",
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const ensureIndex = () =>
	elastic.indices.create(
		{
			index: GAMES_SEARCH_INDEX,
			body: {
				mappings: {
					properties: {
						id: { type: "text" },
						name: { type: "search_as_you_type" },
						boxArtUrl: { type: "text" },
					},
				},
			},
		},
		{ ignore: [400] }
	);

export const bulkInsertGames = (games: HelixGameData[]) =>
	elastic.bulk({
		refresh: true,
		body: games.flatMap((game) => [
			{ index: { _index: GAMES_SEARCH_INDEX, _id: game.id } },
			{
				id: game.id,
				name: game.name,
				boxArtUrl: game.box_art_url,
			},
		]),
	});

export const searchGames = (query: string) => {
	return elastic.search({
		index: GAMES_SEARCH_INDEX,
		query: {
			multi_match: {
				query,
				type: "bool_prefix",
				fields: ["name", "name._2gram", "name._3gram"],
			},
		},
	});
};
