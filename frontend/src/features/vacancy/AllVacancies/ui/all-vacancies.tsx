import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import React, { useEffect } from "react";

import { getAllVacanciesThunk } from "../models/get-all-vacancies-thunk";
import styles from "./all-vacancies.module.scss";
import { useNavigate } from "react-router";
import { Button } from "../../../../shared/ui";
import { selectIsAuthorized } from "../../../../entities/session/model/auth-selectors";
import { selectAllVacancies } from "../../../../entities/vacancy/model/vacancy-selectors";
import { Link } from "react-router-dom";

export const Vacancies = () => {
	const dispatch = useAppDispatch();
	const isAuthorized = useAppSelector(selectIsAuthorized);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getAllVacanciesThunk(null));
	}, [dispatch]);

	const data = useAppSelector(selectAllVacancies);
	console.log(data);
	return (
		<div>
			<h1 className={styles.articles__title}>Вакансии</h1>
			<Button
				content="Опубликовать вакансию"
				disabled={isAuthorized ? false : true}
				className={styles.button}
				onClick={() => navigate("#")}
				type="button"
			/>{" "}
			<ul className={styles.vacancies}>
				{data.length >= 1 ? (
					data.map((vacancy) => {
						return (
							<li className={styles.vacancy} key={vacancy.id}>
								<h3>
									<Link to={`/vacancy/${vacancy.id}`}>
										{vacancy.title} <br />
									</Link>
								</h3>
								<a href={"#"}> {vacancy.author_id}</a> <br />
								<p>Описание {vacancy.body}</p>
								<p className={styles.article__date}>
									Дата создания
									{new Date(vacancy.created_at).toLocaleDateString()}{" "}
								</p>
								<br />
								{vacancy.description} <br />
								<p className={styles.salary}>
									Зарплата от {vacancy.salary_from} до {vacancy.salary_to} ₽
								</p>
								<Button
									content="Откликнуться"
									disabled={isAuthorized ? false : true}
									className={styles.vacancy__button}
									onClick={() => navigate(`/vacancy/${vacancy.id}`)}
									type="button"
								/>
							</li>
						);
					})
				) : (
					<h1>Нету вакансий</h1>
				)}
			</ul>
		</div>
	);
};
