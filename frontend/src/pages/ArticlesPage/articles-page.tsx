import React from "react";
import { Articles } from "../../features/article/AllArticles/ui/all-article";
import styles from "./articles-page.module.scss";
export const ArticlesPage = () => {
	return (
		<main className={styles.main}>
			<Articles />
		</main>
	);
};
