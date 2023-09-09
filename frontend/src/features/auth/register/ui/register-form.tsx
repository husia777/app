import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Button } from "../../../../shared/ui";
import styles from "./register-form.module.scss";
import { registerThunk, RegisterParams } from "../models/register-thunk";
import { useAppDispatch } from "../../../../app/Store/redux-hook";

export const RegisterForm: React.FC = () => {
	const form = useForm<RegisterParams>();

	const { register, handleSubmit, formState, watch, reset, trigger } = form;

	const { isSubmitSuccessful } = formState;
	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<RegisterParams> = (data: RegisterParams) => {
		console.log(data)
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
						/>
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
					<div className="form-control">
						<label htmlFor="password_repeat">Пароль</label>
						<input
							type="password"
							id="password_repeat"
							placeholder="Подтвердите пароль"
							{...register("password_repeat", {
								required: { value: true, message: "Поле пароль обязательно" },
							})}
						/>
					</div>
					<Button content="Зарегистрироваться" className={styles.button} />
				</form>
			</div>
		</div>
	);
};
