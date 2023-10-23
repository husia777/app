import React from "react";
import styles from "./profile-personal.module.scss";
import { useAppSelector } from "../../../../../app/Store/redux-hook";
import { selectUserData } from "../../../../../entities/user/model/user-selectors";
export const ProfilePersonal: React.FC = () => {
	const userData = useAppSelector(selectUserData);
	return (
		<div className={styles.profile}>
			<h2 className={styles.profile__username}>
				Имя пользователя: {userData.username}
			</h2>
			<h2 className={styles.profile__email}>
				Почта пользователя: {userData.email}
			</h2>
			<h2 className={styles.profile__isactiv}>
				{userData.isVerified ? "Активированный" : "Неактивированный"} аккаунт
			</h2>
			<h2 className={styles.profile__date}>
				Дата регистрации: {userData.registeredAt}
			</h2>
			<h2 className={styles.profile__name}>
				{userData.name ? userData.name : "Имя не задано"}
			</h2>
		</div>
	);
};
