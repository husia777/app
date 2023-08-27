import { Root } from "../pages/RootPage";
import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import { NotFound } from "../pages/NotFound";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
export const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: "login", element: <LoginPage /> },
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
