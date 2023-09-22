import { z } from "zod";

export const registerFormSchema = z
	.object({
		email: z.string().email("Неверный формат почты"),
		username: z.string().min(6, 'Длина имени пользователя должна быть больше 6'),
		password: z
			.string()
			.min(8, "Пароль должен состоять  более чем из 8 символов"),
	})
	.required();
