import { Stats, StreamInfos } from "./structures";

export class DataManager {
	private stats: Stats = {} as Stats;
	private streamers: StreamInfos[] = [];
	private games: Record<string, { name: string; viewers: number }> = {};
	private events: any[] = [];

	getStreamers() {
		return this.streamers;
	}
	getStats() {
		return this.stats;
	}
	getGames() {
		return this.games;
	}
	getEvents() {
		return this.events;
	}

	setStreamers(streamers: StreamInfos[]) {
		this.streamers = streamers;
		this.processGames();
	}

	setEvents(events: any[]) {
		return (this.events = events);
	}

	updateStats(
		donations: number,
		viewersCount: number,
		onlineStreams: number
	) {
		this.stats = {
			donations,
			viewersCount,
			onlineStreams,
			mostWatchedGame: this.getMostWatchedGame(),
			mostWatchedChannel: this.getMostWatchedChannel(),
		};
	}

	private processGames() {
		const games: Record<string, { name: string; viewers: number }> = {};

		this.streamers.forEach((l) => {
			// console.log(l.display + " - " + l.gameId);
			games[l.gameId]
				? (games[l.gameId].viewers += l.viewers)
				: (games[l.gameId] = {
						name: l.game,
						viewers: l.viewers,
				  });
		});
		delete games.offline;
		this.games = games;
	}

	private getMostWatchedGame() {
		let mostWatchedGame: {
			name: string;
			viewers: number;
		} = { name: "offline", viewers: 0 };
		let lastAmount = -1;
		Object.entries(this.games).forEach(([game, infos]) => {
			if (infos.viewers > lastAmount) {
				mostWatchedGame = infos;
				lastAmount = infos.viewers;
			}
		});
		return mostWatchedGame;
	}
	private getMostWatchedChannel() {
		let mostWatchedChannel: {
			name: string;
			viewers: number;
		} = {
			name: "",
			viewers: 0,
		};
		let lastAmount = -1;
		this.streamers.forEach((entry) => {
			if (entry.viewers > lastAmount) {
				mostWatchedChannel = {
					name: entry.display,
					viewers: entry.viewers,
				};
				lastAmount = entry.viewers;
			}
		});
		return mostWatchedChannel;
	}
}
