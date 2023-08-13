import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Todo {
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
}
const todoSlice = createSlice({
	name: "@@todos",
	initialState: 0,
	reducers: {
		addTodo: (state, action: PayloadAction<number>) => {
			return action.payload;
		},
	},
});

export const { addTodo } = todoSlice.actions;
export const todoReducers = todoSlice.reducer;
export const rootReducer = combineReducers({ todo: todoReducers });

export type RootState = ReturnType<typeof rootReducer>;
