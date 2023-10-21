import React from "react";
import styles from "./profile-page.module.scss";
import { ProfilePersonal } from "../../features/user/ProfileSection/ProfilePersonal/ui/profile-personal";

export const ProfilePage = () => {
	return (
		<div className={styles.personal}>
			<ProfilePersonal />
		</div>
	);
};
