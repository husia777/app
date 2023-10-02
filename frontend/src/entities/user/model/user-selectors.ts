import { RootState } from "../../../app/Store/rootReducer";
export const selectUserData = (state: RootState) => {
	return state.user;
};