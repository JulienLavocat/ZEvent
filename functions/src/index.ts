import * as functions from "firebase-functions";
import updateStats from "./functions/updateStats";

export const manualUpdate = functions
	.runWith({ secrets: ["TWITCH_ID", "TWITCH_SECRET"] })
	.https.onRequest((request, response) => {
		updateStats(response);
	});
