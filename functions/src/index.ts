import * as functions from "firebase-functions";
import updateStats from "./functions/updateStats";
import * as admin from "firebase-admin";

admin.initializeApp();

export const manualUpdate = functions
	.runWith({ secrets: ["TWITCH_ID", "TWITCH_SECRET"] })
	.https.onRequest((request, response) => {
		updateStats(response);
	});
