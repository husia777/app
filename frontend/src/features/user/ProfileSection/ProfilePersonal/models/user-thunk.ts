import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { CurrentUserResponse } from "../../../../../entities/user/model/types";
import { UserService } from "../../../../../entities/user/api/user-api";

export const getCurrentUserThunk = createAsyncThunk<
	AxiosResponse<CurrentUserResponse>
>("user/currentUser", async () => {
	return UserService.getCurrentUser();
});
