import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/Store/rootReducer";
import { AxiosResponse } from "axios";
import { ArticleService } from "../../../../../../entities/article/api/article-api";

export const deleteArticleThunk = createAsyncThunk<
	AxiosResponse,
	number,
	{ state: RootState }
>("user/article/delete", async (articleId) => {
	return ArticleService.delete(articleId);
});
