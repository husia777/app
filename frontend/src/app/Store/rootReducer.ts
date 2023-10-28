import { combineReducers } from "@reduxjs/toolkit";
import { sessionReducer } from "../../entities/session/model/sessionSlice";
import { userReducer } from "../../entities/user/model/user-slice";
import { articleReducer } from "../../entities/article/model/article-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { vacancyReducer } from "../../entities/vacancy/model/vacancy-slice";

export const rootReducer = combineReducers({
	articles: articleReducer,
	session: sessionReducer,
	user: userReducer,
	vacancy: vacancyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
	key: "root",
	storage,
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
