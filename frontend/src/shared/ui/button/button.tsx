import React from "react";
import styles from "./button.module.scss";
interface IButton {
	onClick: () => void;
	content: string;
	className?: string;
}
export const Button: React.FC<IButton> = (props) => {
	return <button onClick={props.onClick} className={styles.button}>{props.content}</button>;
};
