import React from "react";
import styles from "./main-page.module.scss";
import { useAuth } from "../../features/auth/hooks/use-auth";
import { useNavigate } from "react-router";
export const MainPage = () => {
	return (

		<main className={styles.main}>
			<h1>Main Page</h1>
		</main>
	);
};
// export const MainPage = () => {
// 	const { isLoggedIn, userData } = useAuth();
// 	const navigate = useNavigate();
// 	isLoggedIn
// 	return isLoggedIn ? (
// 		<main className={styles.main}>
// 			<h1>Main Page</h1>
// 		</main>
// 	) : (
// 		navigate("/login")
// 	);
// };
