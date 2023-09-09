
export interface LoginParams {
	password: string;
	username: string;
}
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../../entities/session";
import { RootState } from "app/Store/rootReducer";

export const loginThunk = createAsyncThunk<
	void,
	LoginParams,
	{ state: RootState }
>("auth/login", async (body: LoginParams, { dispatch }) => {
	AuthService.login(body.username, body.password);
});
