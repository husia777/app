import React from "react";
interface IButton {
	onClick?: () => void;
	content: string;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
}
export const Button: React.FC<IButton> = (props) => {
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			className={props.className}
		>
			{props.content}
		</button>
	);
};
