import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../utils/interfaces";

export interface EventState {
	event: Event | null;
}

const initialState: EventState = {
	event: null,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setEvent: (state, action: PayloadAction<Event | null>) => {
			state.event = action.payload;
		},
	},
});

export const { setEvent } = counterSlice.actions;

export default counterSlice.reducer;
