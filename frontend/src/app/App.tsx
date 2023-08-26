import React from "react";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { RouterProvider } from "react-router";
import { appRouter } from "./app-route";
function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={appRouter} />
		</Provider>
	);
}
export default App;
