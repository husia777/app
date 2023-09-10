import axios from "axios";

export const API_LOCALHOST_URL = `http://localhost:8000`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_LOCALHOST_URL,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem("accessToken");
	return config;
});

export { $api };
