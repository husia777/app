import { $api } from "shared/ui/api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../model/types";

export class AuthService {
	static async login(
		username: string,
		password: string
	): Promise<AxiosResponse> {
		return $api.post<AuthResponse>("/login", { username, password });
	}
	static async registration(username: string, password: string) {
		return $api.post("/registration", { username, password });
	}

	static async logout() {
		return $api.get("/logout");
	}
}
