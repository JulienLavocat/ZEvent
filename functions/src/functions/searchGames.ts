import { CallableContext } from "firebase-functions/v1/https";
import * as elastic from "../utils/elasticsearch";

export async function searchGames(data: any, context: CallableContext) {
	const query = data?.query;

	if (!query || typeof query !== "string" || query.length < 2) return [];
	const res = await elastic.searchGames(query);
	return res.hits.hits.map((e: any) => e._source);
}
