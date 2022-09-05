import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";

export function createTwitchClient() {
	return new ApiClient({
		authProvider: new ClientCredentialsAuthProvider(
			process.env.TWITCH_ID || "",
			process.env.TWITCH_SECRET || ""
		),
	});
}
