import { Button } from "../../../../../shared/ui/button/button";
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
	// const email = useAppSelector(selectUserData);
	const email = localStorage.getItem("email");
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		if (email) {
			dispatch(accountConfirmationThunk(email));
		}
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
