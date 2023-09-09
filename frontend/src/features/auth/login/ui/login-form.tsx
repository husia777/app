import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from "../../../../shared/ui";
import { loginThunk } from "../models/login-thunk";
import styles from "./login-form.modules.scss";
import { LoginParams } from "../models/login-thunk";
import { useAppDispatch } from "../../../../app/Store/redux-hook";

export const LoginForm: React.FC = () => {
	const form = useForm<LoginParams>();

	const { register, handleSubmit, formState, watch, reset, trigger } = form;

	const { isSubmitSuccessful } = formState;
	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<LoginParams> = (data: LoginParams) => {
		dispatch(loginThunk(data));
	};
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<div className={styles.form}>
			<div className={styles["form-wrapper"]}>
				<div className={styles.title}>Добро пожаловать</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-control">
						<label htmlFor="username">Логин</label>
						<input
							type="text"
							id="username"
							placeholder="Введите имя пользователя"
							{...register("username", {
								required: { value: true, message: "Поле логин обязательно" },
							})}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							id="password"
							placeholder="Введите пароль"
							{...register("password", {
								required: { value: true, message: "Поле пароль обязательно" },
							})}
						/>
					</div>
					<Button content="Войти" className={styles.button} />
				</form>
			</div>
		</div>
	);
};
