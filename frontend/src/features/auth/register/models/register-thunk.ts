import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../../entities/session";
import { RootState } from "app/Store/rootReducer";
export interface RegisterParams {
	username: string;
	email: string;
	password: string;
	password_repeat: string;
}
export const registerThunk = createAsyncThunk<
	void,
	RegisterParams,
	{ state: RootState }
>("auth/register", async (body: RegisterParams, { dispatch }) => {
	const data = AuthService.registration(
		body.username,
		body.email,
		body.password,
		body.password_repeat
	);
	console.log(data)
});
