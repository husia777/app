import React, { useEffect } from "react";
import styles from "./detail-vacancy.module.scss";
import { useParams } from "react-router-dom";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import { getVacancyThunk } from "../models/get-vacancy-thunk";
import { selectCurrentVacancy } from "../../../../entities/vacancy/model/vacancy-selectors";

export const DetailVacancy = () => {
	const dispatch = useAppDispatch();
	const { vacancyId } = useParams();

	useEffect(() => {
		dispatch(getVacancyThunk(Number(vacancyId)));
	}, [dispatch, vacancyId]);

	const vacancy = useAppSelector(selectCurrentVacancy);
	return (
		<div>
			{vacancy ? (
				<div>
					<h1>{vacancy?.title}</h1>
					<p>{vacancy?.body}</p>
					{vacancy?.description}
					<p>
						Зарплата от {vacancy?.salary_from} до {vacancy?.salary_to} ₽
					</p>
					<p>{vacancy?.body}</p>
					<p>
						Дата создания
						{new Date(vacancy.created_at).toLocaleDateString()}
					</p>
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};
