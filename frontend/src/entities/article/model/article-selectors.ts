import { RootState } from "../../../app/Store/rootReducer";

export const selectAllArticles = (state: RootState) => {
	return state.articles.listArticles;
};

export const selectMyArticles = (state: RootState) => {
	return state.articles.myArticles;
};
