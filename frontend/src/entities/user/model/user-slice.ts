import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk } from "../../../features/user/profile/models/user-thunk";
export interface userSliceState {
	userId: string;
	username?: string;
	email: string;
}

const initialState: userSliceState = {
	userId: "",
	username: "",
	email: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getCurrentUserThunk.fulfilled,
			(state: userSliceState, { payload }) => {
				state.userId = payload.data.id;
				console.log(state.userId, 'userId')
				state.username = payload.data.username;
				state.email = payload.data.email
				
			}
		);
	},
});
