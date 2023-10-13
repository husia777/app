import axios from "axios";
import { config } from "dotenv";

export const API_LOCALHOST_URL = process.env.API_LOCALHOST_URL;
const ACCESS_CONTROL_ALLOW_ORIGIN = process.env.ACCESS_CONTROL_ALLOW_ORIGIN;



const $api = axios.create({
	withCredentials: true,
	baseURL: API_LOCALHOST_URL,
	headers: {
		"Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
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

// $api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		if (error.response && error.response.status === 401) {
// 			try {
// 				const refreshToken = useAppSelector(selectRefreshToken);
// 				const dispatch = useAppDispatch();

// 				if (refreshToken) {
// 					dispatch(refreshThunk(refreshToken));
// 				}
// 				const token = useAppSelector(selectAccessToken);

// 				const config = error.config;
// 				config.headers.Authorization = `Bearer ${token}`;
// 				return axios.request(config);
// 			} catch (refreshError) {
// 				console.error("Failed to refresh access token:", refreshError);
// 			}
// 		}

// 		throw error;
// 	}
// );

export { $api };

// $api.interceptors.response.use((response) => {
// 	const { status, config } = response;
// 	const dispatch = useAppDispatch();

// 	if (status === 401) {
// 		const refreshToken = useAppSelector(selectRefreshToken);

// 		if (refreshToken) {
// 			dispatch(refreshThunk(refreshToken));
// 		}
// 	}
// 	const token = useAppSelector(selectAccessToken);
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}

// 	return response;
// });
