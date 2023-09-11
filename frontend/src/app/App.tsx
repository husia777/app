import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./Store/store";
import { RouterProvider } from "react-router";
import { appRouter } from "./app-route";
import { PersistGate } from "redux-persist/integration/react";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={appRouter} />
			</PersistGate>
		</Provider>
	);
}
export default App;
