import React from "react";
import { Button } from "../../../../../shared/ui/";
import { useAppDispatch } from "../../../../../app/Store/redux-hook";
import { clearSessionData } from "../../../../../entities/session/model/sessionSlice";
import { useNavigate } from "react-router";
interface ILogout {
	onClick?: () => void;
	className?: string;
}

export const Logout: React.FC<ILogout> = (props) => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(clearSessionData());
	};
	return (
		<Button
			disabled={true}
			content="Выйти"
			className={props.className}
			onClick={handleLogout}
			type="button"
		/>
	);
};
