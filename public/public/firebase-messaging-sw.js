importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

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

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onMessage((payload) => {
	console.log("sw", payload);
});
