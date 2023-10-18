import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./create-article-form.module.scss";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import { useNavigate } from "react-router";
import {
	CreateArticleParamsUi,
	CreateArticleParamsBackend,
	createArticleThunk,
} from "../model/create-article-thunk";
import {
	successAlert,
	CustomToastContainer,
	errorAlert,
} from "../../../../shared/ui/customAlert/custom-alert";
import { getUserData } from "../../../../features/auth/hooks/get-user-data";
import { Button } from "../../../../shared/ui";

export const CreateArticleForm: React.FC = () => {
	const form = useForm<CreateArticleParamsUi>();
	const { register, handleSubmit, formState, watch, reset } = form;

	const { isSubmitSuccessful, errors, isValid } = formState;
	const current_user_id = getUserData().id as number;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<CreateArticleParamsUi> = async (
		data: CreateArticleParamsUi
	) => {
		try {
			const params: CreateArticleParamsBackend = {
				body: data.body,
				title: data.title,
				author_id: current_user_id,
			};
			await dispatch(createArticleThunk(params));
			successAlert("Ваша статья опубликована");
		} catch (error) {
			errorAlert("При создании статьи произошла ошибка");
		}
	};

	return (
		<>
			<div className={styles["form-wrapper"]}>
				<h1 className={styles.title}>Статья</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles["form-control"]}>
						<label htmlFor="title">Заголовок статьи</label>
						<input
							className={styles.article__title}
							type="text"
							id="title"
							placeholder="Придумайте заголовок статьи"
							{...register("title", {
								required: {
									value: true,
									message: "У статьи обязательно должен быть заголовок",
								},
							})}
						/>
						{errors.title && (
							<p className={styles.error}>{errors.title.message}</p>
						)}
					</div>
					<div className={styles["form-control"]}>
						<label htmlFor="body"> Содержание статьи</label>
						<textarea
							className={styles.article__body}
							id="body"
							placeholder=" Ваша  статья"
							{...register("body", {
								required: {
									value: true,
									message: "У статьи обязательно должно быть тело",
								},
							})}
						/>
						{errors.body && (
							<p className={styles.error}>{errors.body.message}</p>
						)}
					</div>
					<Button
						content="Создать статью"
						disabled={false}
						className={styles.article__button}
					/>
				</form>
			</div>
		</>
	);
};
