import React, { useEffect } from "react";
import styles from "./account-confirmation-form.module.scss";
import { useForm } from "react-hook-form";
import { accountConfirmationCodeParams } from "../../models/account-confirmation-thunk";
import { Button } from "../../../../../shared/ui/button/button";
import {
	CustomToastContainer,
	successAlert,
} from "../../../../../shared/ui/customAlert/custom-alert";
import { useNavigate } from "react-router";
import {
	useAppSelector,
	useAppDispatch,
} from "../../../../../app/Store/redux-hook";
import { selectConfirmCode } from "../../../../../entities/session/model/auth-selectors";
import { accountActivationThunk } from "../../models/account-confirmation-thunk";
import { getUserData } from "../../../../../features/auth/hooks/get-user-data";

export const AccountConfirmationForm: React.FC = () => {
	const userId = String(getUserData()?.id);

	const form = useForm<accountConfirmationCodeParams>();
	const { register, handleSubmit, formState, reset } = form;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const code = useAppSelector(selectConfirmCode);
	const { isSubmitSuccessful, errors } = formState;

	const onSubmit = (data: accountConfirmationCodeParams) => {
		console.log(code)
		console.log(data.code);
		console.log(userId, "userId");
		if (data.code === code) {
			dispatch(accountActivationThunk(userId)).then(() =>
				successAlert("Аккаунт успешно подтвержден")
			);
		}
	};

	return (
		<>
			<div className={styles["form-wrapper"]}>
				<div className={styles.title}>Подтверждение аккаунта</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="code">Код</label>

					<input
						type="number"
						id="code"
						placeholder="Введите код подтверждения аккаунта"
						{...register("code", {
							required: {
								value: true,
								message: "Введите код подтверждения аккаунта",
							},
						})}
					/>
					{errors.code && <p className="error">{errors.code.message}</p>}
					<Button
						content="Подтвердить"
						disabled={false}
						className={styles.button}
					/>
				</form>
				<CustomToastContainer />
			</div>
		</>
	);
};
