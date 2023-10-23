import styles from "./not-found.module.scss";
import React from "react";
export const NotFound = () => {
	return (
		<div className={styles["not-found"]}>
			<div className={styles.background}></div>
			{/* <img
				className={styles.logo}
				src={"../../assets/img/404-mobile.png"}
				alt="not found background img"
			/> */}
		</div>
	);
};
