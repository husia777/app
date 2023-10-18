import { AxiosResponse } from "axios";
import { $api } from "../../../shared/api";
import {
	ArticleResponse,
	ArticleCreate,
	ArticleUpdateResponse,
} from "../model/types";

export class ArticleService {
	static async create(
		title: string,
		body: string,
		author_id: number
	): Promise<AxiosResponse> {
		console.log(title, body, author_id);
		return $api.post<ArticleCreate>("/article/create", {
			title,
			body,
			author_id,
		});
	}
	static async update(
		articleId: number,
		title: string,
		body: string
	): Promise<AxiosResponse> {
		return $api.patch<ArticleUpdateResponse>(`/article/${articleId}/delete`, {
			title,
			body,
		});
	}
	static async delete(articleId: number): Promise<AxiosResponse> {
		return $api.delete(`/article/${articleId}/delete`);
	}
	static async get(articleId: number): Promise<AxiosResponse> {
		const article = await $api.get(`/article/${articleId}`);
		return article;
	}
	static async get_all(): Promise<AxiosResponse> {
		const articles = await $api.get("/articles");
		return articles;
	}
}
