import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/Store/rootReducer";
import { AxiosResponse } from "axios";
import { VacancyService } from "../../../../entities/vacancy/api/vacancy-api";

export const getVacancyThunk = createAsyncThunk<
	AxiosResponse,
	number,
	{ state: RootState }
>("vacancy/get", async (vacancyId: number) => {
	return await VacancyService.get(vacancyId);
});
