import { createSlice } from "@reduxjs/toolkit";
import { getAllVacanciesThunk } from "../../../features/vacancy/AllVacancies/models/get-all-vacancies-thunk";
import { Vacancy } from "./types";
import { getVacancyThunk } from "../../../features/vacancy/DetailVacancy/models/get-vacancy-thunk";

export interface vacancySliceState {
	status: "idle" | "error";
	currentVacancy: Vacancy | null;
	listVacancies: Vacancy[];
	myVacancies: Vacancy[];
}

const initialState: vacancySliceState = {
	status: "idle",
	currentVacancy: null,
	listVacancies: [],
	myVacancies: [],
};

export const vacancySlice = createSlice({
	name: "vacancy",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllVacanciesThunk.fulfilled, (state, { payload }) => {
				console.log(state.listVacancies, "list");
				state.listVacancies = [];
				state.listVacancies.push(...payload.data);
			})
			.addCase(getVacancyThunk.fulfilled, (state, { payload }) => {
				console.log(state.listVacancies, "list");

				state.currentVacancy = payload.data;
			});
	},
});

export const vacancyReducer = vacancySlice.reducer;
