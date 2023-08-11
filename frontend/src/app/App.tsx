import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Store/store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					{/* <Route element={<MainLayout/>} path="/" /> */}
					<Route />
					<Route />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
export default App