import React from "react";
import styles from "./header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo/logo.jpg";
import { Button } from "../../../../shared/ui";
import cx from "classnames";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import { selectIsAuthorized } from "../../../../entities/session/model/auth-selectors";
import { clearSessionData } from "../../../../entities/session/model/sessionSlice";
import { Logout } from "../../../../features/auth/logout/ui/logout-button/logout-button";
import { ProfileButton } from "../../../../entities/user/ui/Button/profile-button";
export const Header: React.FC = () => {
	const navigate = useNavigate();

	const isAuthorized = useAppSelector(selectIsAuthorized);
	return (
		<header className={styles.header}>
			<img
				onClick={() => navigate("/")}
				className={styles.header__logo}
				src={logo}
				alt=""
			/>
			<nav>
				<NavLink className={styles.header__navlink} to="/">
					Статьи
				</NavLink>
				<NavLink className={styles.header__navlink} to="/about">
					Вакансии
				</NavLink>
				<NavLink className={styles.header__navlink} to="/">
					Курсы
				</NavLink>
				{isAuthorized ? (
					<Logout
						className={cx(styles.header__button, styles.header__navlink)}
					/>
				) : (
					<Button
						type="button"
						onClick={() => navigate("/login")}
						className={cx(styles.header__button, styles.header__navlink)}
						content="Вход"
						disabled={false}
					/>
				)}
				{isAuthorized ? (
					<ProfileButton
						onClick={() => {
							navigate("/me");
						}}
						className={cx(styles.header__button, styles.header__navlink)}
					/>
				) : (
					<Button
						type="button"
						onClick={() => navigate("/register")}
						className={cx(styles.header__button, styles.header__navlink)}
						content="Регистрация"
						disabled={false}
					/>
				)}
			</nav>
		</header>
	);
};
