import { $api } from "../../../shared/api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../model/types";
export class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		const data = await $api.post<AuthResponse>("/login", {
			email,
			password,
		});
		if (data.status === 200) {
			localStorage.setItem("accessToken", data.data.accessToken);
			localStorage.setItem("refreshToken", data.data.refreshToken);
		}

		return data;
	}

	static async activateAccount(id: string): Promise<AxiosResponse<boolean>> {
		const data = await $api.post<boolean>("/activate", { id });
		return data;
	}

	static async registration(
		username: string,
		email: string,
		password: string,
		password_repeat: string
	): Promise<AxiosResponse> {
		return $api.post<AuthResponse>("/register", {
			username,
			email,
			password,
			password_repeat,
		});
	}
	static async refreshToken(token: string): Promise<AxiosResponse> {
		const data = await $api.post<string>("/refresh", { token });
		if (data.status === 200) {
			// localStorage.removeItem("accessToken")
			localStorage.setItem("accessToken", data.data)
		}
		return data
		
	}
	static async confirmAccount(email: string): Promise<AxiosResponse> {
		const data = await $api.post<number>("/confirm", { email });
		if (data.status === 200) {
			localStorage.setItem("code", data.data.toString());
		}
		return data;
	}

	static async logout() {
		return $api.get("/logout");
	}
}
