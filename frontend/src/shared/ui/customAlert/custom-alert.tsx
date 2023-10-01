import "react-toastify/dist/ReactToastify.css";
import style from "./custom-alert.module.scss";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import React from "react";
const customToastProperty = {
	position: "bottom-right",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "colored",
} as ToastOptions;

export const successAlert = (title: string) =>
	toast.success(title, customToastProperty);

export const infoAlert = (title: string) =>
	toast.info(title, customToastProperty);

export const warnAlert = (title: string) =>
	toast.warn(title, customToastProperty);

export const errorAlert = (title: string) =>
	toast.error(title, customToastProperty);

export const CustomToastContainer: React.FC = () => (
	<ToastContainer
		position="bottom-right"
		autoClose={3000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="colored"
	/>
);
