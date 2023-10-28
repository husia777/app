import { RootState } from "../../../app/Store/rootReducer";

export const selectAllVacancies = (state: RootState) => {
	return state.vacancy.listVacancies;
};
