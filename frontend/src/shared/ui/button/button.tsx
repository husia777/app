import React from "react";
import styles from "./button.module.scss";
interface IButton {
	content: string;
	className?: string;
}
export const Button: React.FC<IButton> = (props) => {
	return <button className={styles.button}>{props.content}</button>;
};
