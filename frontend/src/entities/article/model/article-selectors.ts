import { RootState } from "../../../app/Store/rootReducer";

export const selectAllArticles = (state: RootState) => {
	return state.articles.listArticles;
};
