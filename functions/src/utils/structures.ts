export interface StreamInfos {
	display: string;
	twitch: string;
	profileUrl: string;
	online: boolean;
	game: string;
	viewers: number;
	// donationGoal: any;
	title: string;
	gameId: string;
}

export interface NumberDisplay {
	number: number;
	formatted: string;
}

export interface DonationGoal {
	donationAmount: NumberDisplay;
}

export interface StreamerData {
	display: string;
	twitch: string;
	profileUrl: string;
	online: boolean;
	game: string;
	viewersAmount: NumberDisplay;
	donationGoal: DonationGoal;
}

export interface ZEventData {
	live: StreamerData[];
	donationAmount: NumberDisplay;
	viewersCount: NumberDisplay;
	calendar: any[];
	isSiteLive: boolean;
	sseActive: boolean;
	banner: null;
	shopLink: null;
	sseUrl: null;
}

export interface Stats {
	donations: number;
	viewersCount: number;
	onlineStreams: number;
	mostWatchedGame: {
		name: string;
		viewers: number;
	};
	mostWatchedChannel: {
		name: string;
		viewers: number;
	};
}

export interface NameViewersPair {
	name: string;
	viewers: number;
}

export interface EventParticipant {
	display: string;
	twitch: string;
	profileUrl: string;
}

export interface Event {
	start: Date;
	end: Date;
	title: string;
	organizers: EventParticipant[];
}
