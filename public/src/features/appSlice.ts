import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../utils/interfaces";

const DISABLE_NEW_USER = "disable-new-user";

export interface AppState {
	event: Event | null;
	game: { name: string; gameId: string } | null;
	showNewUser: boolean;
}

const initialState: AppState = {
	event: null,
	game: null,
	showNewUser: !localStorage.getItem(DISABLE_NEW_USER),
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
		disableNewUser: (state) => {
			state.showNewUser = false;
			localStorage.setItem(DISABLE_NEW_USER, "true");
		},
	},
});

export const { setEvent, setGame } = appSlice.actions;

export default appSlice.reducer;
