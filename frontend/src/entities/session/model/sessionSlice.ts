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
		clearSessionData: (state) => {
			state.accessToken = undefined;
			state.isAuthorized = false;
			state.refreshToken = undefined;
		},
	},
});
