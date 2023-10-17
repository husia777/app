import React from "react";
import {
	useAppSelector,
} from "../../../../../app/Store/redux-hook";
import { selectUserData } from "../../../../../entities/user/model/user-selectors";
export const Profile: React.FC = () => {
	const userData = useAppSelector(selectUserData);
	return (
		<>
			<h2>Имя пользователя: {userData.username}</h2>
			<h2>Почта пользователя: {userData.email}</h2>
			<h2>
				{userData.isVerified ? "Активированный" : "Неактивированный"} аккаунт
			</h2>
			<h2>Дата регистрации: {userData.registeredAt}</h2>
			<h2>{userData.name ? userData.name : "Имя не задано"}</h2>
		</>
	);
};
