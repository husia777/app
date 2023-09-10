/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { RouterProvider } from "react-router";
import { appRouter } from "./app-route";
import { useAppDispatch, useAppSelector } from "./Store/redux-hook";
import { selectIsAuthorized } from "entities/session/model/auth-selectors";
import { useAuth } from "../features/auth/hooks/use-auth";
function App() {
	
	return (
		<Provider store={store}>
			<RouterProvider router={appRouter} />
		</Provider>
	);
}
export default App;
