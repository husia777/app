import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../../../app/Store/rootReducer";
import { AuthService } from "../../../../entities/session";

export interface accountConfirmationParams {
	email: string;
}

export interface accountConfirmationCodeParams {
	code: number;
}

export const accountConfirmationThunk = createAsyncThunk<
	AxiosResponse<number>,
	accountConfirmationParams,
	{ state: RootState }
>("auth/accountConfirmation", async (body: accountConfirmationParams) => {
	return AuthService.confirmAccount(body.email);
});
