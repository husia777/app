import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../../shared/ui";
import styles from "./register-form.module.scss";
import { registerThunk, RegisterParams } from "../models/register-thunk";
import { useAppDispatch } from "../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import {
	successAlert,
	CustomToastContainer,
} from "../../../../shared/ui/customAlert/custom-alert";

type FormFields = "email" | "username" | "password" | "password_repeat";

export const RegisterForm: React.FC = () => {
	const form = useForm<RegisterParams>();

	const { register, handleSubmit, formState, watch, reset } = form;

	const { isSubmitSuccessful, errors, isValid } = formState;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
	const password = watch("password", "");
	const validateConfirmPassword = (value: string) => {
		if (value !== password) {
			errors["password"] = {
				type: "validate",
				message: "Пароли не совпадают",
			};
			return "Подтверждение пароля не совпадает";
		}
		return true;
	};
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<RegisterParams> = (data: RegisterParams) => {
		dispatch(registerThunk(data));
	};
	useEffect(() => {
		if (isSubmitSuccessful) {
			successAlert("Регистрация прошла успешно");

			const timeoutId = setTimeout(() => {
				navigate("/login");
			}, 5000);
			return () => {
				reset(), clearTimeout(timeoutId);
			};
		}
	}, [isSubmitSuccessful, navigate, reset]);
	return (
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
							pattern: {
								value: usernameRegex,
								message:
									"Имя пользователя должно содержать только латинские буквы и цифры, и быть не короче 5 символов",
							},
						})}
					/>
					{errors.username && (
						<p className="error">{errors.username.message}</p>
					)}
				</div>
				<div className="form-control">
					<label htmlFor="email">Почта</label>
					<input
						type="email"
						id="email"
						placeholder="Введите  E-mail"
						{...register("email", {
							required: { value: true, message: "Поле E-mail обязательно" },
							pattern: {
								value: emailRegex,
								message: "Неверный формат электронной почты",
							},
						})}
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
							pattern: {
								value: passwordRegex,
								message:
									"Пароль должен содержать не менее 8 символов, включая буквы и цифры",
							},
						})}
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
							pattern: {
								value: passwordRegex,
								message:
									"Пароль должен содержать не менее 8 символов, включая буквы и цифры",
							},
							validate: validateConfirmPassword,
						})}
					/>
					{errors.password && (
						<p className="error">{errors.password.message}</p>
					)}
				</div>
				<Button
					disabled={false}
					content="Зарегистрироваться"
					className={styles.button}
				/>
			</form>
			<CustomToastContainer />
		</div>
	);
};
