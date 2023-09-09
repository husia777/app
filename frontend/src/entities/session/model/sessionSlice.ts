//Валидация полей формы

import { createSlice } from "@reduxjs/toolkit";
export interface SessionSliceState {
	isAuthorized: boolean;
	accessToken?: string;
	refreshToken?: string;
}

const initialState: SessionSliceState = {
	isAuthorized: false,
};
export const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.isAuthorized = action.payload.isAuthorized;
			state.refreshToken = action.payload.refreshToken;
		},
		clearSessionData: (state) => {
			state.accessToken = undefined;
			state.isAuthorized = false;
			state.refreshToken = undefined;
		},
	},
});

export const { clearSessionData, setAuth } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
