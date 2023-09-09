import { RootState } from "app/Store/rootReducer";
import { useSelector } from "react-redux";

export const useAuth = () => {
	const { isAuthorized, accessToken, refreshToken } = useSelector(
		(state: RootState) => state.session
	);
	return {
		isAuth: isAuthorized,
		accessToken,
		refreshToken,
	};
};
