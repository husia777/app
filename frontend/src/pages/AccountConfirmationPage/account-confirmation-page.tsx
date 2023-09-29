import { styles } from "./account-confirmation-page.module.scss";
import React from "react";
import { AccountConfirmationForm } from "../../features/auth/account_confirmation/ui";
import { ButtonSendConfirmCodeToEmail } from "../../features/auth/account_confirmation/ui/account-confirmation-button/account-confirmation-button";

export const AccountConfirmationPage = () => {
	const code = localStorage.getItem("code");
	return (
		<>{code ? <AccountConfirmationForm /> : <ButtonSendConfirmCodeToEmail />}</>
	);
};
