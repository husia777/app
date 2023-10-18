import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleService } from "../../../../entities/article/api/article-api";
import { RootState } from "../../../../app/Store/rootReducer";
export interface CreateArticleParamsUi {
	title: string;
	body: string;
}

export interface CreateArticleParamsBackend {
	title: string;
	body: string;
	author_id: number;
}

export const createArticleThunk = createAsyncThunk<
	void,
	CreateArticleParamsBackend,
	{ state: RootState }
>("article/create", async (body: CreateArticleParamsBackend) => {
	console.log(body,'body')
	ArticleService.create(body.body, body.title, body.author_id);
});
