import { z } from "zod";

export const registerFormSchema = z
	.object({
		email: z.string().email("Неверный формат почты"),
		username: z
			.string()
			.min(
				5,
				"Длина имени пользователя должна  состоять  из 6 и более символов"
			),
		password: z
			.string()
			.min(7, "Пароль должен состоять  из 8 и более символов"),
		password_repeat: z
			.string()
			.min(7, "Пароль должен состоять  из 8 и более символов"),
	})
	.required()
	.refine((data) => data.password === data.password_repeat, {
		message: "Пароли не совпадают",
		path: ["password_repeat"],
	});
