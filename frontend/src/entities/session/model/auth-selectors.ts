import { RootState } from "../../../app/Store/rootReducer";

export const selectIsAuthorized = (state: RootState) =>
	state.session.isAuthorized;
