import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./login-page.module.scss";
type FormValues = {
	username: string;
	email: string;
	password: string;
};
export const LoginPage = () => {
	const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
		console.log(data);
	};
	const form = useForm<FormValues>();
	const { register, control, handleSubmit, formState } = form;
	const { errors } = formState;

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} >
				<div className="form-control">
					<label htmlFor="username">Логин</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: { value: true, message: "Поле логин обязательно" },
						})}
					/>
					<p className="error">{errors.username?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value:
									/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: "Вы ввели неверный формат электронной почты",
							},
							// validate: {
							// 	notAdmin: (fieldValue) => {
							// 		return (
							// 			fieldValue !== "admin@example.com" ||
							// 			"Enter a different email address"
							// 		);
							// 	},
							// 	// notBlackListed: (fieldValue) => {
							// 	// 	return (
							// 	// 		!fieldValue.endsWith("baddomain.com") ||
							// 	// 		"This domain is not supported"
							// 	// 	);
							// 	// },
							// 	// emailAvailable: async (fieldValue) => {
							// 	// 	const response = await fetch(
							// 	// 		`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
							// 	// 	);
							// 	// 	const data = await response.json();
							// 	// 	return data.length === 0 || "Email already exists";
							// 	// },
							// },
						})}
					/>
					<p className="error">{errors.email?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="password">Пароль</label>
					<input
						id="password"
						type="password"
						placeholder="Введите пароль"
						{...register("password", {
							required: { value: true, message: "Поле пароль обязательно" },
						})}
					/>
					<p className="error">{errors.password?.message}</p>
				</div>
				<button>Отправить</button>
			</form>
			<DevTool control={control} />
		</>
	);
};
