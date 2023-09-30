import { Button } from "../../../../../shared/ui/button/button";
import { getUserData } from "../../../hooks/get-user-data";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import React from "react";
import {
	accountConfirmationParams,
	accountConfirmationThunk,
} from "../../models/account-confirmation-thunk";
import style from "./account-confirmation-form.module.scss";
import { selectUserData } from "../../../../../entities/session/model/auth-selectors";
export const ButtonSendConfirmCodeToEmail = () => {
	const navigate = useNavigate();
	const userData = getUserData();
	console.log(userData);
	const email = userData?.email;
	const dispatch = useAppDispatch();

	const onClick = () => {
		if (email) {
			dispatch(accountConfirmationThunk(email));
		}
	};
	return (
		<Button
			content="Получить код"
			onClick={() => onClick()}
			type="button"
			disabled={false}
			className={style.button}
		/>
	);
};
