import { CallableContext } from "firebase-functions/v1/https";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function unsubscribeFromTopic(
	{
		token,
		topic,
	}: {
		token: string;
		topic: string;
	},
	context: CallableContext
) {
	const res = await admin.messaging().unsubscribeFromTopic(token, topic);

	await admin
		.firestore()
		.doc(`users/${context.auth?.uid}`)
		.update({
			topics: FieldValue.arrayRemove(topic),
		});

	return res;
}
