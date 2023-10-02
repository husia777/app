import { Root } from "../pages/RootPage";
import { useNavigate, createBrowserRouter } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { NotFound } from "../pages/NotFound";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage/profile-page";
import { AccountConfirmationPage } from "../pages/AccountConfirmationPage/";
import { useAppSelector } from "./Store/redux-hook";
import {
	selectIsAuthorized,
	selectIsActive,
} from "../entities/session/model/auth-selectors";
import {
	infoAlert,
	CustomToastContainer,
} from "../shared/ui/customAlert/custom-alert";
import { getUserData } from "../features/auth/hooks/get-user-data";
type GuestGuardProps = {
	children: ReactElement;
};

function GuestGuard({ children }: GuestGuardProps) {
	const [isShownAuthAlert, setShownAuthAlert] = useState(false);
	const [isShownActiveAlert, setShownActiveAlert] = useState(false);
	const isAuthorized = useAppSelector(selectIsAuthorized);
	const isActive = useAppSelector(selectIsActive);
	console.log(isActive, "isActive");
	console.log(isAuthorized, "isAuthorized");
	console.log(isShownAuthAlert, "isShownAuthAlert");
	console.log(isShownActiveAlert, "isShownActiveAlert");
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthorized && !isShownAuthAlert) {
			const timeoutAuthAlert = setTimeout(() => {
				infoAlert(
					"Пользоваться нашими сервисами могут только авторизованные пользователи, подтвердившие свой аккаунт."
				);
			}, 1200);
			setShownAuthAlert(true);
			const timeoutNavigateLogin = setTimeout(() => {
				navigate("/login");
			}, 5000);
			return () => {
				clearTimeout(timeoutAuthAlert);
				clearTimeout(timeoutNavigateLogin);
			};
		}
		if (!isActive && !isShownActiveAlert) {
			const timeoutActiveAlert = setTimeout(() => {
				infoAlert("Подтвердите свой аккаунт.");
			}, 1200);
			setShownActiveAlert(true);

			const timeoutNavigateConfirm = setTimeout(() => {
				navigate("/confirm");
			}, 3000);
			return () => {
				clearTimeout(timeoutActiveAlert);
				clearTimeout(timeoutNavigateConfirm);
			};
		}
	}, [isAuthorized, navigate, isActive, isShownActiveAlert, isShownAuthAlert]);

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
				element: <ProfilePage />,
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
