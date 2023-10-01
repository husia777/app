import { AxiosResponse } from "axios";
import { $api } from "../../../shared/api";
import { CurrentUserResponse } from "../model/types";
export class UserService {
	static async getCurrentUser(): Promise<AxiosResponse<CurrentUserResponse>> {
		const data = await $api.get<CurrentUserResponse>("/profile");

		return data;
	}
}
