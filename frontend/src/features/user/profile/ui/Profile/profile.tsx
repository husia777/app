import { useLoaderData } from "react-router";
import { UserService } from "../../../../../entities/user/api/user-api";

import React from "react";
import { CurrentUserResponse } from "../../../../../entities/user/model/types";
import { AxiosResponse } from "axios";
import { getUserData } from "../../../../../features/auth/hooks/get-user-data";

export const Profile: React.FC = () => {
	const userData = useLoaderData() as CurrentUserResponse;
	return (
		<>
			{console.log(userData)}
			<h2>Имя пользователя: {userData.username}</h2>
			<h2>Почта пользователя: {userData.email}</h2>
			<h2>
				{userData.isVerified ? "Активированный" : "Неактивированный"} аккаунт
			</h2>
			<h2>
				Дата регистрации: {String(userData.registeredAt.toLocaleDateString())}
			</h2>
			<h2>{userData.name ? userData.name : "Имя не задано"}</h2>
		</>
	);
};
