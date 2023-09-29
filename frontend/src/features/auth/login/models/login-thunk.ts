export interface LoginParams {
	password: string;
	email: string;
}
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../../entities/session";
import {RootState} from "../../../../app/Store/rootReducer"
import { AuthResponse } from "../../../../entities/session/model/types";
import { AxiosResponse } from "axios";

export const loginThunk = createAsyncThunk<
	AxiosResponse<AuthResponse>,
	LoginParams,
	{ state: RootState }
>("auth/login", async (body: LoginParams) => {
	return AuthService.login(body.email, body.password);
});
