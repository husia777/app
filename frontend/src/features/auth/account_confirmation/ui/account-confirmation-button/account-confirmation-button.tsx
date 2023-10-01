import { Button } from "../../../../../shared/ui/button/button";
import { getUserData } from "../../../hooks/get-user-data";
import { useAppDispatch } from "../../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import React from "react";
import { accountConfirmationThunk } from "../../models/account-confirmation-thunk";
import style from "./account-confirmation-form.module.scss";

export const ButtonSendConfirmCodeToEmail = () => {
	const userData = getUserData();
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
