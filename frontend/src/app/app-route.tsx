import { Root } from "../pages/RootPage";
import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { NotFound } from "../pages/NotFound";
import { MainPage } from "../pages/MainPage";
import { RegisterPage } from "../pages/RegisterPage"; 
export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: "register", element: <RegisterPage /> },
			// {path: "register", element: <LoginPage />}
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
