import { RootState } from "app/Store/rootReducer";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/Store/redux-hook";
import { selectUserData } from "../../../entities/session/model/auth-selectors";
interface AccessToken {
	sub: string;
}
export const getUserData = () => {
	const accessToken = localStorage.getItem("accessToken");
	const JWT_SECRET = process.env.JWT_SECRET;
	console.log(JWT_SECRET);
};
