import { Root } from "../pages/RootPage";
import { Navigate, createBrowserRouter } from "react-router-dom";
import React, { Component, ReactElement } from "react";
import { NotFound } from "../pages/NotFound";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { useAppSelector } from "./Store/redux-hook";
import { selectIsAuthorized } from "../entities/session/model/auth-selectors";
import { useAuth } from "../features/auth/hooks/use-auth";
import { ProfilePage } from "../pages/ProfilePage/profile-page";
import { profileLoader } from "../features/user/profile/ui/Profile/profile";
import { UserService } from "../entities/user/api/user-api";
type GuestGuardProps = {
	children: ReactElement;
};

function GuestGuard({ children }: GuestGuardProps) {
	const isAuthorized = useAppSelector(selectIsAuthorized);

	if (!isAuthorized) return <Navigate to="/login" />;

	return children;
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
					return UserService.getCurrentUser();
				},
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
