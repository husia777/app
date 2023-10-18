import { Outlet } from "react-router";
import { Footer } from "../../widgets/Layout/UI/footer";
import { Header } from "../../widgets/Layout/UI/header";
import styles from "./root-page.module.scss";
import React from "react";

export const Root: React.FC = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};
