import { useAppDispatch } from "../../../app/Store/redux-hook";
import axios from "axios";
import { config } from "dotenv";
import { refreshThunk } from "../../../features/auth_refresh/models/refresh-thunk";
export const API_LOCALHOST_URL = `http://huseinnaimov.com:8080`;
// export const API_LOCALHOST_URL = `http://huseinnaimov.com/api/`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_LOCALHOST_URL,
	headers: {
		"Access-Control-Allow-Origin": "http://huseinnaimov.com",
		// "Origin": "http://huseinnaimov.com",
		"Access-Control-Allow-Credentials": true,
	},
});

$api.interceptors.request.use(async (config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
$api.interceptors.response.use(async (response) => {
	const { status } = response;
	const dispatch = useAppDispatch();

	if (status === 401) {
		const refreshToken = localStorage.getItem("refreshToken");

		if (refreshToken) {
			dispatch(refreshThunk(refreshToken));
		}
	}
	return response;
});
export { $api };
