import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../../entities/session";
import { AxiosResponse } from "axios";

export const refreshThunk = createAsyncThunk<AxiosResponse<string>, string>(
	"auth/refreshToken",
	async (body: string) => {
		return AuthService.refreshToken(body);
	}
);
