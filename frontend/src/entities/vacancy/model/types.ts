export type FormatOfWorkEnum = "remote" | "in_the_office" | "hybrid";

export interface Vacancy {
	id: number;
	title: string;
	description: string;
	body: string;
	salary_from: number;
	salary_to: number;
	form_of_work: FormatOfWorkEnum;
	author_id: number;
	created_at: Date;
}

export interface VacancyUpdate {
	title: string;
	description: string;
	body: string;
	salary_from: number;
	salary_to: number;
	form_of_work: FormatOfWorkEnum;
}
