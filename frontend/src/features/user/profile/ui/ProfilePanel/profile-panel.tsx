import React from "react";
import styles from "./profile-panel.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { Button } from "../../../../../shared/ui";
export const ProfilePanel = () => {
	return (
		<>
			<div className={styles.panel}>
				<a className={styles.panel__link} href="/profile/personal">
					<IoSettingsOutline
						display="21"
						// color="white"
						color="white"
						size={40}
						className={styles.panel__icon}
					/>
					<h2 className={styles.panel__title}>Личные данные</h2>
				</a>
				<a className={styles.panel__link} href="/profile/">
					<RiArticleLine
						color="white"
						size={40}
						className={styles.panel__icon}
					/>
					<h2 className={styles.panel__title}>Статьи</h2>
				</a>
				<a className={styles.panel__link} href="/profile/">
					<BsPersonLinesFill
						color="white"
						size={40}
						className={styles.panel__icon}
					/>
					<h2 className={styles.panel__title}>Резюме</h2>
				</a>
			</div>
		</>
	);
};
