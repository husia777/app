import { z } from "zod";

export const loginFormSchema = z
	.object({
		email: z.string().email("Неверный формат почты"),
		password: z
			.string()
			.min(7, "Пароль должен состоять  из 8 и более символов"),
	})
	.required();
