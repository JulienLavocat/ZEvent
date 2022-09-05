import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getMessaging, onMessage } from "firebase/messaging";
import { Avatar } from "react-daisyui";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
	apiKey: "AIzaSyDNkffNX8zbJCMZNlQ_RhQdrxsvo_aspj0",
	authDomain: "zevent-33dd3.firebaseapp.com",
	databaseURL: "https://zevent-33dd3.firebaseio.com",
	projectId: "zevent-33dd3",
	storageBucket: "zevent-33dd3.appspot.com",
	messagingSenderId: "653828792922",
	appId: "1:653828792922:web:45c6f3d026dd74d12e2e63",
	measurementId: "G-34525FGWNN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const messaging = getMessaging();
const functions = getFunctions();
const firestore = getFirestore();

onMessage(messaging, (payload) => {
	toast.success(payload.notification?.title, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
	});
});

if (import.meta.env.DEV) {
	connectFirestoreEmulator(firestore, "localhost", 8080);
	connectDatabaseEmulator(database, "localhost", 9000);
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFunctionsEmulator(functions, "localhost", 5001);
}

export { app, database, messaging, auth, functions, firestore };
