import React from "react";
import styles from "./root-profile-page.module.scss";
import { Outlet } from "react-router";
import { ProfilePanel } from "../../features/user/ProfilePanel/profile-panel";
ProfilePanel;
export const RootProfilePage = () => {
	return (
		<div className={styles.profile__container}>
			<div className={styles.profile__panel}>
				<ProfilePanel />
			</div>
			<div className={styles.profile__content}>
				<Outlet />
			</div>
		</div>
	);
};
