import { $api } from "../../../shared/ui/api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../model/types";

export class AuthService {
	static async login(
		username: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		const data = await $api.post<AuthResponse>("/login", {
			username,
			password,
		});

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

	static async refreshToken(token: string) {
		return $api.post<string>("/refresh", { token });
	}

	static async logout() {
		return $api.get("/logout");
	}
}

// if (data.status === 200) {
// 	localStorage.setItem("accessToken", data.data.accessToken);
// 	localStorage.setItem("refreshToken", data.data.refreshToken);
// }
