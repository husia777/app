import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk } from "../../../features/user/profile/models/user-thunk";
export interface userSliceState {
	email: string;
	id: string;
	username: string;
	registeredAt: string;
	name: string;
	isActive: boolean;
	isSuperuser: boolean;
	isVerified: boolean;
	hashedPassword: string;
	surname: string;
}

const initialState: userSliceState = {
	email: "",
	id: "",
	username: "",
	registeredAt: "",
	name: "",
	isActive: false,
	isSuperuser: false,
	isVerified: false,
	hashedPassword: "",
	surname: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUserData: (state) => {
			state.email = "";
			state.id = "";
			state.username = "";
			state.registeredAt = "";
			state.name = "";
			state.surname = "";
			state.isActive = false;
			state.isVerified = false;
		},
		setUserData: (state, action) => {
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.registeredAt = action.payload.registeredAt;
			state.name = action.payload.name;
			state.isActive = action.payload.isActive;
			state.isVerified = action.payload.isVerified;
			state.surname = action.payload.surname;
		},
	},
});

export const { setUserData, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
