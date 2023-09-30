import { RootState } from "app/Store/rootReducer";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/redux-hook";
import { selectUserData } from "../../../entities/session/model/auth-selectors";
interface AccessToken {
	sub: string;
}

export const getUserData = () => {
	const accessToken = localStorage.getItem("accessToken") as string;

	if (accessToken) {
		const encodedPayload = accessToken.split(".")[1];
		const decodedPayload = atob(encodedPayload);
		const userData = JSON.parse(decodedPayload);
		const emailRegex = /email='([^']+)'/;
		const idRegex = /id=(\d+)/;

		const emailMatch = emailRegex.exec(userData.sub);
		const idMatch = idRegex.exec(userData.sub);

		const email = emailMatch ? emailMatch[1] : "";
		const id = idMatch ? parseInt(idMatch[1], 10) : 0;

		return { email, id };
	}
};
