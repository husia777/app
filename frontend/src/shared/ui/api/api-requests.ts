import axios from "axios";

export const API_LOCALHOST_URL = `http://localhost:8080`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_LOCALHOST_URL,
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem(
		"accessToken"
	)
	if (token) {

		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export { $api };
