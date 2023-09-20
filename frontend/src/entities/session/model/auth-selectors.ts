import { RootState } from "../../../app/Store/rootReducer";

export const selectIsAuthorized = (state: RootState) => {
	return state.session.isAuthorized;
};

export const selectAccessToken = (state: RootState) => {
	return state.session.accessToken;
};

export const selectRefreshToken = (state: RootState) => {
	return state.session.refreshToken;
};
