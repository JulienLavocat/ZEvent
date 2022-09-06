import * as functions from "firebase-functions";
import updateStats from "./functions/updateStats";
import * as admin from "firebase-admin";
import { beforeUserCreate } from "./functions/beforeUserCreate";
import { subscribeToTopic as subscribeToTopicFunction } from "./functions/subscribeToTopic";
import { collectGames as collectGamesFunction } from "./functions/collectGames";
import { unsubscribeFromTopic as unsubscribeFromTopicFunction } from "./functions/unsubscribeFromTopic";
import { searchGames as searchGamesFunction } from "./functions/searchGames";

admin.initializeApp();

export const manualUpdate = functions
	.runWith({ secrets: ["TWITCH_ID", "TWITCH_SECRET"] })
	.https.onRequest(async (request, response) => {
		const stats = await updateStats();
		response.json(stats);
	});

export const periodicUpdate = functions
	.runWith({
		secrets: ["TWITCH_ID", "TWITCH_SECRET"],
	})
	.pubsub.schedule("every 1 minutes")
	.onRun(updateStats);

export const collectGames = functions
	.runWith({
		secrets: [
			"TWITCH_ID",
			"TWITCH_SECRET",
			"ELASTIC_HOST",
			"ELASTIC_USERNAME",
			"ELASTIC_PASSWORD",
		],
	})
	.pubsub.schedule("every 1 hours")
	.onRun(collectGamesFunction);

export const manualCollectGames = functions
	.runWith({
		secrets: [
			"TWITCH_ID",
			"TWITCH_SECRET",
			"ELASTIC_HOST",
			"ELASTIC_USERNAME",
			"ELASTIC_PASSWORD",
		],
	})
	.https.onRequest(async (req, res) => {
		await collectGamesFunction();
		res.send("done");
	});

export const onUserCreate = functions.auth.user().onCreate((user) => {
	beforeUserCreate(user);
});

export const subscribeToTopic = functions.https.onCall(
	subscribeToTopicFunction
);

export const unsubscribeFromTopic = functions.https.onCall(
	unsubscribeFromTopicFunction
);

export const searchGames = functions
	.runWith({
		secrets: ["ELASTIC_HOST", "ELASTIC_USERNAME", "ELASTIC_PASSWORD"],
	})
	.https.onCall(searchGamesFunction);
