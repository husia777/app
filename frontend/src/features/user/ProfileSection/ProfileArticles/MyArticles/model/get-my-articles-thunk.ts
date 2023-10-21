import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleService } from "../../../../../../entities/article/api/article-api";
import { AxiosResponse } from "axios";
import { RootState } from "app/Store/rootReducer";

export const getMyArticlesThunk = createAsyncThunk<
	AxiosResponse,
	number,
	{ state: RootState }
>("user/articles", async (userId: number) => {
	return ArticleService.getUserArticles(userId);
});
