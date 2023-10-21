import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllArticleThunk } from "../../../features/article/AllArticles/models/get-all-article-thunk";
import { ArticleResponse, UserArticleResponse } from "./types";
import { AxiosResponse } from "axios";
import { RootState } from "../../../app/Store/rootReducer";
import { getMyArticlesThunk } from "../../../features/user/ProfileSection/ProfileArticles/MyArticles/model/get-my-articles-thunk";

export interface articleSliceState {
	status: "idle" | "error";
	listArticles: ArticleResponse[];
	myArticles: UserArticleResponse[];
}

const initialState: articleSliceState = {
	status: "idle",
	listArticles: [],
	myArticles: [],
};

export const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		deleteArticleAction: (state, action) => {
			state.myArticles = state.myArticles.filter(
				(article) => article.id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllArticleThunk.fulfilled, (state, { payload }) => {
				state.listArticles = [];
				state.listArticles.push(...payload.data);
			})
			.addCase(getMyArticlesThunk.fulfilled, (state, { payload }) => {
				state.myArticles = [];
				state.myArticles.push(...payload.data);
			});
	},
});

export const articleReducer = articleSlice.reducer;
export const { deleteArticleAction } = articleSlice.actions;
