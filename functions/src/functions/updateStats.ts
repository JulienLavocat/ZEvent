import { HelixStream } from "@twurple/api";
import * as database from "firebase-admin/database";
import { getZEvent } from "../utils/getZevent";
import {
	NameViewersPair,
	Stats,
	StreamerData,
	StreamInfos,
} from "../utils/structures";
import { createTwitchClient } from "../utils/twitch";
import fetch from "node-fetch";

const dates = ["2022-09-08", "2022-09-09", "2022-09-10", "2022-09-11"];

interface Participant {
	display: string;
	profileUrl: string;
	twitch: string;
}

interface DonationGoal {
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

interface StatsData {
	stats: Stats;
	streamers: StreamInfos[];
	games: Record<string, NameViewersPair>;
	events: {
		end: string;
		start: string;
		organizers: Participant[];
		participants: Participant[];
		title: string;
		description: string | null;
	}[];
	updatedAt: string;
	donationGoals: DonationGoal[];
}

export default async function updateStats() {
	const zevent = await getZEvent();
	const streamers = await enrichStream(zevent.live);

	const mostWatchedChannel = streamers.reduce((previous, current) =>
		previous.viewers > current.viewers ? previous : current
	);
	const games = processGames(streamers);

	let events: StatsData["events"] = [];
	try {
		events = await loadEvents();
	} catch (error) {
		console.error(error);
	}

	let donationGoals: StatsData["donationGoals"] = [];
	try {
		donationGoals = await loadDonationGoals();
	} catch (error) {
		console.error(error);
	}

	const data: StatsData = {
		stats: {
			donations: zevent.donationAmount.number,
			viewersCount: streamers.reduce<number>(
				(acc, val) => acc + val.viewers,
				0
			),
			onlineStreams: streamers.filter((l) => l.online).length,
			mostWatchedChannel: {
				name: mostWatchedChannel.display,
				viewers: mostWatchedChannel.viewers,
			},
			mostWatchedGame: getMostWatchedGame(games),
		},
		streamers,
		games,
		events,
		donationGoals,
		updatedAt: new Date().toISOString(),
	};

	await database.getDatabase().ref().set(data);
	return data;
}

async function enrichStream(channels: StreamerData[]): Promise<StreamInfos[]> {
	const twitch = createTwitchClient();

	const streams = new Map<string, HelixStream>();
	(
		await twitch.streams.getStreamsByUserNames(
			channels.map((e) => e.twitch)
		)
	).forEach((e) => {
		streams.set(e.userName, e);
	});

	const lives: StreamInfos[] = [];
	for (const l of channels) {
		const hasStream = streams.has(l.twitch);
		const stream = streams.get(l.twitch) as HelixStream;
		const game = hasStream
			? stream.gameName === ""
				? "Non défini"
				: stream.gameName
			: "Offline";

		lives.push({
			display: l.display,
			// donationGoal: {
			// 	donationAmount: l.donationGoal.donationAmount.number,
			// },
			profileUrl: l.profileUrl,
			twitch: l.twitch,
			online: hasStream,
			game: game,
			viewers: hasStream ? stream.viewers : 0,
			title: hasStream ? stream.title : "Offline",
			gameId: hasStream
				? stream.gameId === ""
					? "-1"
					: stream.gameId
				: "offline",
		});
	}
	return lives.sort((a, b) => b.viewers - a.viewers);
}

function processGames(streamers: StreamInfos[]) {
	const games: Record<string, NameViewersPair> = {};

	streamers.forEach((l) => {
		games[l.gameId]
			? (games[l.gameId].viewers += l.viewers)
			: (games[l.gameId] = {
					name: l.game,
					viewers: l.viewers,
			  });
	});
	delete games.offline;
	return games;
}

function getMostWatchedGame(games: Record<string, NameViewersPair>) {
	let mostWatchedGame: {
		name: string;
		viewers: number;
	} = { name: "offline", viewers: 0 };
	let lastAmount = -1;
	Object.entries(games).forEach(([game, infos]) => {
		if (infos.viewers > lastAmount) {
			mostWatchedGame = infos;
			lastAmount = infos.viewers;
		}
	});
	return mostWatchedGame;
}

async function loadEvents(): Promise<StatsData["events"]> {
	const events = (
		await Promise.all(
			dates.map((date) =>
				fetch(`https://zevent.gdoc.fr/api/events/${date}.json`)
					.then((r) => r.json())
					.then((r) => r.data)
			)
		)
	).flat() as {
		name: string;
		start_at: string;
		finished_at: string;
		hosts: any[];
		participants: any[];
		description: string | null;
	}[];
	return events.map((e) => ({
		end: e.finished_at,
		start: e.start_at,
		title: e.name,
		participants:
			e.participants.map<Participant>((p) => ({
				display: p.name,
				profileUrl: p.profile_url,
				twitch: p.id,
			})) || [],
		organizers:
			e.hosts.map<Participant>((p) => ({
				display: p.name,
				profileUrl: p.profile_url,
				twitch: p.id,
			})) || [],
		description: e.description,
	}));
}

async function loadDonationGoals(): Promise<DonationGoal[]> {
	const data = (await fetch("https://zevent.gdoc.fr/api/donation-goals.json")
		.then((r) => r.json())
		.then((r) => r.data)) as {
		name: string;
		twitch_login: string;
		profile_url: string;
		donation_goals: {
			name: string;
			type: string;
			amount: number;
			achieved_at: string;
			done: boolean;
		}[];
	}[];

	return data.map((e) => ({
		displayName: e.name,
		profileUrl: e.profile_url,
		twitch: e.twitch_login,
		donationGoals: e.donation_goals.map((e) => ({
			name: e.name,
			type: e.type,
			amount: e.amount,
			achievedAt: e.achieved_at,
			done: e.done,
		})),
	}));
}
