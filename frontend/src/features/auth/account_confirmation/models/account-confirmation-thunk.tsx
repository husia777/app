import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../../../app/Store/rootReducer";
import { AuthService } from "../../../../entities/session";

export interface accountConfirmationParams {
	userId: string;
}

export interface accountConfirmationCodeParams {
	code: number;
}


export const accountConfirmationThunk = createAsyncThunk<
	AxiosResponse<number>,
	string,
	{ state: RootState }
>("auth/accountConfirmation", async (body: string) => {
	return AuthService.confirmAccount(body);
});

export const accountActivationThunk = createAsyncThunk<
	AxiosResponse<boolean>,
	string,
	{
		state: RootState;
	}
>("auth/accountActivation", async (body: string) => {
	return AuthService.activateAccount(body);
});
