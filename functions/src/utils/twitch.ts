import TwitchApi from "node-twitch";

export function createTwitchClient() {
	return new TwitchApi({
		client_id: process.env.TWITCH_ID || "",
		client_secret: process.env.TWITCH_SECRET || "",
	});
}
