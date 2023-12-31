import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/Store/rootReducer";
import { AxiosResponse } from "axios";
import { VacancyService } from "../../../../entities/vacancy/api/vacancy-api";

export const getAllVacanciesThunk = createAsyncThunk<
	AxiosResponse,
	null,
	{ state: RootState }
>("vacancy/getAll", async (_) => {
	console.log('111111111111111')
	return await VacancyService.getAll();
});
