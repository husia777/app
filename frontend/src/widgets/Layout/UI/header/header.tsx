import React from "react";
import styles from "./header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo/logo.png";
import { Button } from "../../../../shared/ui";
export const Header: React.FC = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};
	return (
		<header className={styles.header}>
			<img
				onClick={() => handleClick()}
				className={styles.header__logo}
				src={logo}
				alt=""
			/>
			<nav>
				<NavLink  className={styles.header__navlink} to="/">
					Main
				</NavLink>
				<NavLink className={styles.header__navlink} to="/about">
					About
				</NavLink>
				<NavLink className={styles.header__navlink} to="/me">
					Me
				</NavLink>
				<Button  className={styles.header__button} content="Регистрация" />
			</nav>
		</header>
	);
};
