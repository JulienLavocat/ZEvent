export interface StreamInfos {
	display: string;
	twitch: string;
	profileUrl: string;
	online: boolean;
	game: string;
	viewers: number;
	donationGoal: any;
	title: string;
	gameId: string;
}

export interface NumberDisplay {
	number: number;
	formatted: string;
}

export interface DonationGoal {
	displayName: string;
	twitch: string;
	profileUrl: string;
	donationGoals: {
		name: string;
		type: string;
		amount: number;
		achievedAt: string;
		done: boolean;
	}[];
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
	profileUrl: string;
	twitch: string;
	url?: string;
}

export interface Event {
	start: string;
	end: string;
	title: string;
	organizers: EventParticipant[];
	participants: EventParticipant[];
	description: string | null;
}

interface Participant {
	display: string;
	profileUrl: string;
	twitch: string;
}
