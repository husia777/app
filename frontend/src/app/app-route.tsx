import { Root } from "../pages/RootPage";
import { useNavigate, createBrowserRouter } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { NotFound } from "../pages/NotFound";
import { ArticlesPage } from "../pages/ArticlesPage";
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
import { getAllArticleThunk } from "../features/article/AllArticles/models/get-all-article-thunk";
import { CreateArticlePage } from "../pages/CreateArticlePage/create-article-page";
import { RootProfilePage } from "../pages/RootProfilePage/root-profile-page";

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
			if (token) {
				dispatch(refreshThunk(token));
				dispatch(setUserData(getUserData()));
			}
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
						<ArticlesPage />
					</GuestGuard>
				),
				loader: () => {
					return getAllArticleThunk(null);
				},
			},
			{ path: "register", element: <RegisterPage /> },
			{ path: "login", element: <LoginPage /> },
			{
				path: "profile/",
				element: (
					<GuestGuard>
						<RootProfilePage />
					</GuestGuard>
				),
				children: [{ path: "personal", element: <ProfilePage /> }],
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
				path: "article/create",
				element: (
					<GuestGuard>
						<CreateArticlePage />
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
