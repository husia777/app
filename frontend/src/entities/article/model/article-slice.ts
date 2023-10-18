import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllArticleThunk } from "../../../features/article/AllArticles/models/get-all-article-thunk";
import { ArticleResponse } from "./types";
import { AxiosResponse } from "axios";
import { RootState } from "../../../app/Store/rootReducer";

export interface articleSliceState {
	status: "idle" | "error";
	listArticles: ArticleResponse[];
}

const initialState: articleSliceState = {
	status: "idle",
	listArticles: [],
};

export const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllArticleThunk.fulfilled, (state, { payload }) => {
			state.listArticles = [];
			state.listArticles.push(...payload.data);
		});
	},
});

export const articleReducer = articleSlice.reducer;
