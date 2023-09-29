import { useLoaderData } from "react-router";
import { UserService } from "../../../../../entities/user/api/user-api";

import React from "react";
import { CurrentUserResponse } from "../../../../../entities/user/model/types";
import { AxiosResponse } from "axios";
export const profileLoader = () => {
	const data = UserService.getCurrentUser();
	return data;
};

export const Profile: React.FC = () => {
	const userData = useLoaderData() as AxiosResponse<CurrentUserResponse>;
	return (
		<>
			<h2>Id Пользователя: {userData.data.id}</h2>
			<h2>Имя Пользователя: {userData.data.username}</h2>
		</>
	);
};
