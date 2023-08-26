import { Outlet } from "react-router";
import { Button } from "../../shared/ui";
import { Footer } from "../../widgets/Layout/UI/footer";
import { Header } from "../../widgets/Layout/UI/header";
import styles from "./main-page.module.scss";
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
