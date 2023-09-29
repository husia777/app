import { loginThunk } from "../../../features/auth/login/models/login-thunk";
import { refreshThunk } from "../../../features/auth/auth_refresh/models/refresh-thunk";
import { accountConfirmationThunk } from "../../../features/auth/account_confirmation/models/account-confirmation-thunk";

import { createSlice } from "@reduxjs/toolkit";
export interface SessionSliceState {
	isAuthorized: boolean;
	accessToken?: string;
	refreshToken?: string;
	userId?: string;
	code?: number;
}
export interface sessionPayload {
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
			state.userId = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				loginThunk.fulfilled,
				(state: SessionSliceState, { payload }) => {
					state.isAuthorized = true;
					if (state.isAuthorized) {
						state.refreshToken = payload.data.refreshToken;
						state.accessToken = payload.data.accessToken;
					}
				}
			)
			.addCase(
				refreshThunk.fulfilled,
				(state: SessionSliceState, { payload }) => {
					state.accessToken = payload.data;
					state.isAuthorized = true;
				}
			)
			.addCase(
				accountConfirmationThunk.fulfilled,
				(state: SessionSliceState, { payload }) => {
					state.code = payload.data;
				}
			);
	},
});

export const { clearSessionData } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
