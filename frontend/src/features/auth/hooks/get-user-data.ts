import { RootState } from "app/Store/rootReducer";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/redux-hook";
import { selectUserData } from "../../../entities/session/model/auth-selectors";
import { refreshThunk } from "../../../features/auth/auth_refresh/models/refresh-thunk";



export const getUserData = () => {
	const accessToken = localStorage.getItem("accessToken") as string;
	const encodedPayload = accessToken.split(".")[1];
	const decodedPayload = atob(encodedPayload);
	const userData = JSON.parse(JSON.parse(decodedPayload).sub);
	const email = userData.email;
	const id = userData.id;
	const username = userData.username;
	const registeredAt = new Date(userData.registered_at);
	const name = userData.name;
	const isActive = userData.is_active;
	const isSuperuser = userData.is_superuser;
	const isVerified = userData.is_verified;
	console.log(isVerified, "isVerified");
	const hashedPassword = userData.hashed_password;
	const surname = userData.surname;

	return {
		email,
		id,
		username,
		registeredAt,
		name,
		isActive,
		isSuperuser,
		isVerified,
		hashedPassword,
		surname,
	};
};
