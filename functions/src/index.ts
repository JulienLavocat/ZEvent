import * as functions from "firebase-functions";
import updateStats from "./functions/updateStats";
import * as admin from "firebase-admin";

admin.initializeApp();

export const manualUpdate = functions
	.runWith({ secrets: ["TWITCH_ID", "TWITCH_SECRET"] })
	.https.onRequest((request, response) => {
		const stats = updateStats();
		response.json(stats);
	});

export const periodicUpdate = functions
	.runWith({
		secrets: ["TWITCH_ID", "TWITCH_SECRET"],
	})
	.pubsub.schedule("every 1 minutes")
	.onRun(() => updateStats());
