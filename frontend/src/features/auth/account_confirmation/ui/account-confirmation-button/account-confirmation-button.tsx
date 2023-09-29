import { Button } from "../../../../../shared/ui/button/button";
import { useAppDispatch } from "../../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import React from "react";
import {
	accountConfirmationParams,
	accountConfirmationThunk,
} from "../../models/account-confirmation-thunk";
import style from "./account-confirmation-form.module.scss";
export const ButtonSendConfirmCodeToEmail = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const onSubmit = () => {
		const email = localStorage.getItem(
			"email"
		) as unknown as accountConfirmationParams;
		// if (email) {,,
		dispatch(accountConfirmationThunk(email));
		// }
	};
	return (
		<Button
			content="Получить код"
			onClick={() => onSubmit()}
			type="button"
			disabled={false}
			className={style.button}
		/>
	);
};
