import { Response } from "firebase-functions";
import { Stream } from "node-twitch/dist/types/objects";
import { getZEvent } from "../utils/getZevent";
import {
	NameViewersPair,
	Stats,
	StreamerData,
	StreamInfos,
} from "../utils/structures";
import { createTwitchClient } from "../utils/twitch";
import * as database from "firebase-admin/database";

interface StatsData {
	stats: Stats;
	streamers: StreamInfos[];
	games: Record<string, NameViewersPair>;
	events: any[];
}

export default async function updateStats(response: Response) {
	const zevent = await getZEvent();
	const streamers = await enrichStream(zevent.live);

	const mostWatchedChannel = streamers.reduce((previous, current) =>
		previous.viewers > current.viewers ? previous : current
	);
	const games = processGames(streamers);

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
		events: zevent.calendar.map((e: any) => ({
			...e,
			start: new Date(e.start).toISOString(),
			end: new Date(e.end).toISOString(),
		})),
	};

	await database.getDatabase().ref().set(data);
	response.json(data);
}

async function enrichStream(channels: StreamerData[]): Promise<StreamInfos[]> {
	const twitch = createTwitchClient();

	const streams = new Map<string, Stream>();
	(
		await twitch.getStreams({
			channels: channels.map((e) => e.twitch),
		})
	).data.forEach((e) => {
		streams.set((e as any).user_login, e);
	});

	const lives: StreamInfos[] = [];
	for (const l of channels) {
		const hasStream = streams.has(l.twitch);
		const stream = streams.get(l.twitch) as Stream;
		const game = hasStream
			? (stream as any).game_name === ""
				? "Non défini"
				: (stream as any).game_name
			: "Offline";

		lives.push({
			display: l.display,
			donationGoal: {
				donationAmount: l.donationGoal.donationAmount.number,
			},
			profileUrl: l.profileUrl,
			twitch: l.twitch,
			online: hasStream,
			game: game,
			viewers: hasStream ? stream.viewer_count : 0,
			title: hasStream ? stream.title : "Offline",
			gameId: hasStream
				? stream.game_id === ""
					? "-1"
					: stream.game_id
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
