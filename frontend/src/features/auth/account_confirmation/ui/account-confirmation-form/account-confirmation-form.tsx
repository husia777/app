import React, { useEffect } from "react";
import styles from "./account-confirmation-form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { accountConfirmationCodeParams } from "../../models/account-confirmation-thunk";
import { Button } from "../../../../../shared/ui/button/button";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../../app/Store/redux-hook";
import { selectConfirmCode } from "../../../../../entities/session/model/auth-selectors";
export const AccountConfirmationForm: React.FC = () => {
	const form = useForm<accountConfirmationCodeParams>();
	const { register, handleSubmit, formState, reset } = form;
	const navigate = useNavigate();
	const code = useAppSelector(selectConfirmCode);
	const { isSubmitSuccessful, errors } = formState;
	const onSubmit = () => {};

	useEffect(() => {}, []);
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
			</div>
		</>
	);
};
