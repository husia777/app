import { z } from "zod";

export const loginFormSchema = z
	.object({
		email: z.string().email("Неверный формат почты"),
		password: z
			.string()
			.min(8, "Пароль должен состоять  более чем из 8 символов"),
	})
	.required();
