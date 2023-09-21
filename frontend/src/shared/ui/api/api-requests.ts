import axios from "axios";
import { config } from "dotenv";
import { useAppDispatch, useAppSelector } from "../../../app/Store/redux-hook";
import {
	selectAccessToken,
	selectRefreshToken,
} from "../../../entities/session/model/auth-selectors";
import { refreshThunk } from "features/auth/auth_refresh/models/refresh-thunk";
export const API_LOCALHOST_URL = `http://huseinnaimov.com:8080`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_LOCALHOST_URL,
	headers: {
		"Access-Control-Allow-Origin": "http://huseinnaimov.com",
		"Access-Control-Allow-Credentials": true,
	},
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export { $api };

$api.interceptors.response.use(async (response) => {
	const { status, config } = response;
	const dispatch = useAppDispatch();

	if (status === 401) {
		const refreshToken = useAppSelector(selectRefreshToken);

		if (refreshToken) {
			dispatch(refreshThunk(refreshToken));
		}
	}
	const token = useAppSelector(selectAccessToken);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return response;
});
