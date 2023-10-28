import { AxiosResponse } from "axios";
import { $api } from "../../../shared/api";
import { FormatOfWorkEnum, Vacancy, VacancyUpdate } from "../model/types";

export class VacancyService {
	static async create(
		title: string,
		description: string,
		body: string,
		salary_from: number,
		salary_to: number,
		form_of_work: FormatOfWorkEnum,
		author_id: number
	) { 
		$api.post<Vacancy>("/vacancy/create", {
			title,
			description,
			body,
			salary_from,
			salary_to,
			form_of_work,
			author_id,
		});
	}
	static async get(vacancyId: number): Promise<AxiosResponse> {
		const vacancy = await $api.get(`/vacancy/${vacancyId}`);
		return vacancy;
	}
	static async getAll() {
		const vacancies = await $api.get("/vacancies");
		return vacancies;
	}
	static async delete(vacancyId: number): Promise<AxiosResponse> {
		return $api.delete(`vacancy/${vacancyId}/delete`);
	}
	static async update(
		vacancyId: number,
		title: string,
		description: string,
		body: string,
		salary_from: number,
		salary_to: number,
		form_of_work: FormatOfWorkEnum
	): Promise<AxiosResponse> {
		return $api.patch<VacancyUpdate>(`/vacancy/${vacancyId}/edit`, {
			title,
			description,
			body,
			salary_from,
			salary_to,
			form_of_work,
		});
	}
}
