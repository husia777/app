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
export const Header: React.FC = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};

	const isAuthorized = useAppSelector(selectIsAuthorized);
	console.log(isAuthorized);
	return (
		<header className={styles.header}>
			<img
				onClick={() => handleClick()}
				className={styles.header__logo}
				src={logo}
				alt=""
			/>
			<nav>
				<NavLink className={styles.header__navlink} to="/">
					Main
				</NavLink>
				<NavLink className={styles.header__navlink} to="/about">
					About
				</NavLink>
				<NavLink className={styles.header__navlink} to="/me">
					Me
				</NavLink>
				{isAuthorized ? (
					<Logout
						className={cx(
							styles["header__button-color-white"],
							styles.header__navlink
						)}
					/>
				) : (
					<Button
						type="button"
						onClick={() => navigate("/login")}
						className={cx(
							styles["header__button-color-white"],
							styles.header__navlink
						)}
						content="Вход"
					/>
				)}
				{isAuthorized || <Button
					type="button"
					onClick={() => navigate("/register")}
					className={cx(styles.header__button, styles.header__navlink)}
					content="Регистрация"
				/>}
			</nav>
		</header>
	);
};
