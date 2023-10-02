import { useLoaderData } from "react-router";
import React, { useEffect } from "react";
import { CurrentUserResponse } from "../../../../../entities/user/model/types";
import { useAppDispatch } from "../../../../../app/Store/redux-hook";
import { refreshThunk } from "../../../../../features/auth/auth_refresh/models/refresh-thunk";
export const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const token = localStorage.getItem("accessToken") as string;
	
	useEffect(() => {
		dispatch(refreshThunk(token));
	});
	const userData = useLoaderData() as CurrentUserResponse;
	return (
		<>
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
