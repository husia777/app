import { RootState } from "app/Store/rootReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
interface AccessToken {
	sub: string;
}
export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			const decodedToken: AccessToken = jwtDecode(token) as AccessToken;
			setUserData(decodedToken.sub);
			setIsLoggedIn(true);
		}
	}, []);
	return { isLoggedIn, userData };
};
