import React from "react";
import { Button } from "../../../../shared/ui";
import cx from "classnames";
import styles from "./profile-button.module.scss";
interface ProfileButton {
	onClick?: () => void;
	className?: string;
}
export const ProfileButton: React.FC<ProfileButton> = (props) => {
	return (
		<Button onClick={props.onClick} className={cx(styles["profile-button"], props.className)} content="Личный кабинет" />
	);
};
