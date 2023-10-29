import { RootState } from "../../../app/Store/rootReducer";

export const selectAllVacancies = (state: RootState) => {
	return state.vacancy.listVacancies;
};

export const selectCurrentVacancy = (state: RootState) => {
	return state.vacancy.currentVacancy;
};
