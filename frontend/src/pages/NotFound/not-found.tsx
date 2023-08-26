import styles from "./not-found.module.scss";
import React from "react";
export const NotFound = () => {
	return (
		<div className={styles["not-found"]}>
			<img
				className={styles.logo}
				src={"../../assets/img/404.png"}
				alt="not found background img"
			/>
		</div>
	);
};
