import { combineReducers } from "@reduxjs/toolkit";
import { sessionReducer } from "../../entities/session/model/sessionSlice";
// export const rootReducer = combineReducers({ sessionSlice.name: sessionSlice.reducer });
export const rootReducer = combineReducers({ session: sessionReducer });

export type RootState = ReturnType<typeof rootReducer>;
