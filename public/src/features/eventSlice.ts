import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../utils/interfaces";

export interface EventState {
	event: Event | null;
	game: { name: string; gameId: string } | null;
}

const initialState: EventState = {
	event: null,
	game: null,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setEvent: (state, action: PayloadAction<EventState["event"]>) => {
			state.event = action.payload;
		},
		setGame: (state, action: PayloadAction<EventState["game"]>) => {
			state.game = action.payload;
		},
	},
});

export const { setEvent, setGame } = counterSlice.actions;

export default counterSlice.reducer;
