import { AxiosResponse } from "axios";
import { $api } from "../../../shared/api";
import {
	ArticleResponse,
	UserArticleResponse,
	ArticleCreate,
	ArticleUpdateResponse,
} from "../model/types";

export class ArticleService {
	static async create(
		title: string,
		body: string,
		author_id: number
	): Promise<AxiosResponse> {
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
	static async getUserArticles(userId: number): Promise<AxiosResponse> {
		const myArticles = await $api.get<UserArticleResponse[]>(
			`articles/user/${userId}`
		);
		return myArticles;
	}
}
