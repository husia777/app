import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import React, { useEffect } from "react";

import { selectAllVacancies } from "../../../../entities/vacancy/model/vacansy-selectors";
import { getAllVacanciesThunk } from "../models/get-all-vacancies-thunk";
import styles from "./all-vacancies.module.scss";
import { useNavigate } from "react-router";
import { Button } from "../../../../shared/ui";
import { selectIsAuthorized } from "../../../../entities/session/model/auth-selectors";

export const Vacancies = () => {
	const isAuthorized = useAppSelector(selectIsAuthorized);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllVacanciesThunk(null));
	}, [dispatch]);

	const data = useAppSelector(selectAllVacancies);

	return (
		<>
			<h1 className={styles.articles__title}>Вакансии</h1>
			<Button
				content="Создать вакансию"
				disabled={isAuthorized ? false : true}
				className={styles.article__button}
				onClick={() => navigate("/vacancy/create")}
				type="button"
			/>{" "}
			<ul className={styles.articles}>
				{data.length >= 1 ? (
					[data[0]].map((vacancy) => {
						{
							console.log(vacancy.created_at);
						}
						return (
							<li className={styles.article} key={vacancy.id}>
								<a href={"#"}>Автор</a> <br />
								<h3>
									<a href="#">
										Заголовок {vacancy.title} <br />
									</a>
								</h3>
								<p>Описание {vacancy.body}</p>
								<p className={styles.article__date}>
									Дата создания
									{new Date(vacancy.created_at).toLocaleDateString()}{" "}
								</p>
								<br />
								Содержание {vacancy.description} <br />
							</li>
						);
					})
				) : (
					<h1>Нету вакансий</h1>
				)}
			</ul>
		</>
	);
};
