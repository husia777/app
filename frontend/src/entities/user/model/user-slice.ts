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

const userSlice = createSlice({
	name: "user",
	initialState: {
		email: "",
		id: "",
		username: "",
		registeredAt: null,
		name: "",
		isActive: false,
		isSuperuser: false,
		isVerified: false,
		hashedPassword: "",
		surname: "",
	},
	reducers: {
		setUserData: (state, action) => {
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.registeredAt = action.payload.registeredAt;
			state.name = action.payload.name;
			state.isActive = action.payload.isActive;
			state.isSuperuser = action.payload.isSuperuser;
			state.isVerified = action.payload.isVerified;
			state.hashedPassword = action.payload.hashedPassword;
			state.surname = action.payload.surname;
		},
	},
});

export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;