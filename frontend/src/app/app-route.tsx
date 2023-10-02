import { Root } from "../pages/RootPage";
import { useNavigate, createBrowserRouter } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { NotFound } from "../pages/NotFound";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage/profile-page";
import { AccountConfirmationPage } from "../pages/AccountConfirmationPage/";
import { useAppDispatch, useAppSelector } from "./Store/redux-hook";
import { setUserData } from "../entities/user/model/user-slice";
import { selectIsAuthorized } from "../entities/session/model/auth-selectors";
import {
	infoAlert,
	CustomToastContainer,
} from "../shared/ui/customAlert/custom-alert";
import { getUserData } from "../features/auth/hooks/get-user-data";
import { selectUserData } from "../entities/user/model/user-selectors";
import { refreshThunk } from "../features/auth/auth_refresh/models/refresh-thunk";
type GuestGuardProps = {
	children: ReactElement;
};

function GuestGuard({ children }: GuestGuardProps) {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(selectUserData);

	const isAuthorized = useAppSelector(selectIsAuthorized);
	const isVerified = userData.isVerified;
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthorized) {
			const token = localStorage.getItem("accessToken") as string;
			console.log(token, "token");
			if (token) {
				dispatch(refreshThunk(token));
				dispatch(setUserData(getUserData()));
			}
			console.log(token);
			console.log(isAuthorized);
			console.log(isVerified);
		}
		if (!isAuthorized) {
			const timeoutAuthAlert = setTimeout(() => {
				infoAlert(
					"Пользоваться нашими сервисами могут только авторизованные пользователи, подтвердившие свой аккаунт."
				);
			}, 1200);
			const timeoutNavigateLogin = setTimeout(() => {
				navigate("/login");
			}, 5000);
			return () => {
				clearTimeout(timeoutAuthAlert);
				clearTimeout(timeoutNavigateLogin);
			};
		}
		if (!isVerified) {
			const timeoutActiveAlert = setTimeout(() => {
				infoAlert("Подтвердите свой аккаунт.");
			}, 1200);

			const timeoutNavigateConfirm = setTimeout(() => {
				navigate("/confirm");
			}, 3000);
			return () => {
				clearTimeout(timeoutActiveAlert);
				clearTimeout(timeoutNavigateConfirm);
			};
		}
	}, [isAuthorized, navigate, isVerified, dispatch]);

	return (
		<>
			{children}
			<CustomToastContainer />
		</>
	);
}
export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: (
					<GuestGuard>
						<MainPage />
					</GuestGuard>
				),
			},
			{ path: "register", element: <RegisterPage /> },
			{ path: "login", element: <LoginPage /> },
			{
				path: "profile",
				element: (
					<GuestGuard>
						<ProfilePage />
					</GuestGuard>
				),
				loader: () => {
					return getUserData();
				},
			},
			{
				path: "confirm",
				element: (
					<GuestGuard>
						<AccountConfirmationPage />
					</GuestGuard>
				),
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
