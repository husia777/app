import React, { useEffect, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../../shared/ui";
import styles from "./register-form.module.scss";
import { registerThunk, RegisterParams } from "../models/register-thunk";
import { useAppDispatch } from "../../../../app/Store/redux-hook";
import { registerFormSchema } from "../models/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = "email" | "username" | "password" | "password_repeat";

export const RegisterForm: React.FC = () => {
	const form = useForm<RegisterParams>({
		resolver: zodResolver(registerFormSchema),
	});

	const { register, handleSubmit, formState, watch, reset, trigger } = form;
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fieldName = e.target.name as FormFields;
		trigger(fieldName);
	};
	const { isSubmitSuccessful, errors, isValid } = formState;
	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<RegisterParams> = (data: RegisterParams) => {
		dispatch(registerThunk(data));
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
							onChange={handleInputChange}
						/>
						{errors.username && (
							<p className="error">{errors.username.message}</p>
						)}
					</div>
					<div className="form-control">
						<label htmlFor="email">Почта</label>
						<input
							type="text"
							id="email"
							placeholder="Введите  E-mail"
							{...register("email", {
								required: { value: true, message: "Поле E-mail обязательно" },
								pattern: {
									value:
										true &&
										/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									message: "Вы ввели неверный формат электронной почты",
								},
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
					<div className="form-control">
						<label htmlFor="password_repeat">Пароль</label>
						<input
							type="password"
							id="password_repeat"
							placeholder="Подтвердите пароль"
							{...register("password_repeat", {
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
						disabled={!isValid}
						content="Зарегистрироваться"
						className={styles.button}
					/>
				</form>
			</div>
		</div>
	);
};
