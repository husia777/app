import React, { ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from "../../../../shared/ui";
import { loginThunk } from "../models/login-thunk";
import styles from "./login-form.modules.scss";
import { LoginParams } from "../models/login-thunk";
import { useAppDispatch } from "../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import { loginFormSchema } from "../models/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
type FormFields = "email" | "password";

export const LoginForm: React.FC = () => {
	const form = useForm<LoginParams>({ resolver: zodResolver(loginFormSchema) });

	const { register, handleSubmit, formState, watch, reset, trigger } = form;
	const navigate = useNavigate();

	const { isSubmitSuccessful, errors, isValid } = formState;
	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<LoginParams> = (data: LoginParams) => {
		dispatch(loginThunk(data));
		navigate("/");
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fieldName = e.target.name as FormFields;
		trigger(fieldName);
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
						<label htmlFor="email">Почта</label>
						<input
							type="email"
							id="email"
							placeholder="Введите свою почту"
							{...register("email", {
								required: { value: true, message: "Поле почты обязательно" },
							})}
							onChange={handleInputChange}
						/>
						{errors.email && <p className="error">{errors.email.message}</p>}
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
							onChange={handleInputChange}
						/>
						{errors.password && (
							<p className="error">{errors.password.message}</p>
						)}
					</div>

					<Button
						onClick={() => trigger()}
						content="Войти"
						className={styles.button}
						disabled={!isValid}
					/>
				</form>
			</div>
		</div>
	);
};
