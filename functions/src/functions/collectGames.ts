import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import * as elastic from "../utils/elasticsearch";

const twitch = new ApiClient({
	authProvider: new ClientCredentialsAuthProvider(
		process.env.TWITCH_ID || "",
		process.env.TWITCH_SECRET || ""
	),
});

export async function collectGames() {
	await elastic.ensureIndex();

	const paginator = twitch.games.getTopGamesPaginated();

	let gamesCount = 0;
	while ((await paginator.getNext()).length > 0) {
		if (!paginator.current) break;
		await elastic.bulkInsertGames(paginator.current);
		gamesCount += paginator.current.length;
	}

	console.log("Collected " + gamesCount + " games");
}
