import { combineReducers } from "@reduxjs/toolkit";
import { sessionReducer } from "../../entities/session/model/sessionSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({ session: sessionReducer });

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
	key: "root",
	storage,
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
