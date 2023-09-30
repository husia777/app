import { styles } from "./account-confirmation-page.module.scss";
import React from "react";
import { AccountConfirmationForm } from "../../features/auth/account_confirmation/ui";
import { ButtonSendConfirmCodeToEmail } from "../../features/auth/account_confirmation/ui/account-confirmation-button/account-confirmation-button";
import { useAppDispatch, useAppSelector } from "../../app/Store/redux-hook";
import { selectConfirmCode } from "../../entities/session/model/auth-selectors";
export const AccountConfirmationPage = () => {
	const code = useAppSelector(selectConfirmCode);
	return (
		<>{code ? <AccountConfirmationForm /> : <ButtonSendConfirmCodeToEmail />}</>
	);
};
