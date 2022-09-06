import * as admin from "firebase-admin";
import { AuthUserRecord } from "firebase-functions/lib/common/providers/identity";

export function onUserCreate(user: AuthUserRecord) {
	return admin.firestore().doc(`users/${user.uid}`).set({});
}
