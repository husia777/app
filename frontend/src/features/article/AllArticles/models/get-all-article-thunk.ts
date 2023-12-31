import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/Store/rootReducer";
import { AxiosResponse } from "axios";
import { ArticleService } from "../../../../entities/article/api/article-api";

export const getAllArticleThunk = createAsyncThunk<
	AxiosResponse,
	null,
	{ state: RootState }
>("article/getAll", async (_) => {
	return await ArticleService.get_all();
});
