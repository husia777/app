import React from "react";
import { Button } from "../../../../../shared/ui/";
import { useAppDispatch } from "../../../../../app/Store/redux-hook";
import { clearSessionData } from "../../../../../entities/session/model/sessionSlice";
import { useNavigate } from "react-router";
import { clearUserData } from "../../../../../entities/user/model/user-slice";
interface ILogout {
	onClick?: () => void;
	className?: string;
}

export const Logout: React.FC<ILogout> = (props) => {
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		dispatch(clearSessionData());
		dispatch(clearUserData());
	};
	return (
		<Button
			disabled={false}
			content="Выйти"
			className={props.className}
			onClick={handleLogout}
			type="button"
		/>
	);
};
