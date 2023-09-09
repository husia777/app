import { $api } from "../../../shared/ui/api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../model/types";

export class AuthService {
	static async login(
		username: string,
		password: string
	): Promise<AxiosResponse> {
		return $api.post<AuthResponse>("/login", { username, password });
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

	static async logout() {
		return $api.get("/logout");
	}
}
