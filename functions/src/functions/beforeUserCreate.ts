import * as admin from "firebase-admin";
import { AuthUserRecord } from "firebase-functions/lib/common/providers/identity";

export function beforeUserCreate(user: AuthUserRecord) {
	console.log("beforeCreate");
	admin.firestore().doc(`users/${user.uid}`).set({});
}
