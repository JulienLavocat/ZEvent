import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DonationGoal, Event } from "../utils/interfaces";

const DISABLE_NEW_USER = "disable-new-user";

export interface AppState {
	event: Event | null;
	game: { name: string; gameId: string } | null;
	donationGoal: DonationGoal | null;
	showNewUser: boolean;
	user: {
		fcmToken?: string;
	};
}

const initialState: AppState = {
	event: null,
	game: null,
	donationGoal: null,
	showNewUser: !localStorage.getItem(DISABLE_NEW_USER),
	user: {},
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setEvent: (state, action: PayloadAction<AppState["event"]>) => {
			state.event = action.payload;
		},
		setGame: (state, action: PayloadAction<AppState["game"]>) => {
			state.game = action.payload;
		},
		setDonationGoal: (
			state,
			action: PayloadAction<AppState["donationGoal"]>
		) => {
			state.donationGoal = action.payload;
		},
		disableNewUser: (state) => {
			state.showNewUser = false;
			localStorage.setItem(DISABLE_NEW_USER, "true");
		},
		setFcmToken: (state, action: PayloadAction<string>) => {
			state.user.fcmToken = action.payload;
		},
	},
});

export const {
	setEvent,
	setGame,
	disableNewUser,
	setFcmToken,
	setDonationGoal,
} = appSlice.actions;

export default appSlice.reducer;
