import { createSlice } from "@reduxjs/toolkit";
import { getAllVacanciesThunk } from "../../../features/vacancy/AllVacancies/models/get-all-vacancies-thunk";
import { Vacancy } from "./types";

export interface vacancySliceState {
	status: "idle" | "error";
	listVacancies: Vacancy[];
	myVacancies: Vacancy[];
}

const initialState: vacancySliceState = {
	status: "idle",
	listVacancies: [],
	myVacancies: [],
};

export const vacancySlice = createSlice({
	name: "vacancy",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllVacanciesThunk.fulfilled, (state, { payload }) => {
			state.listVacancies = [];
			state.listVacancies.push(...payload.data);
		});
	},
});

export const vacancyReducer = vacancySlice.reducer;
