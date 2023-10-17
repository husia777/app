import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import { selectAllArticles } from "../../../../entities/article/model/article-selectors";
import React, { useEffect } from "react";
import { getAllArticleThunk } from "../models/get-all-article-thunk";
import styles from "./all-article.module.scss";
// import {  } from "../../../../entities/article/model/types";

export const Articles = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllArticleThunk(null));
	}, [dispatch]);

	const data = useAppSelector(selectAllArticles);
	return (
		<>
			<h1>Статьи</h1>
			<ul className={styles.articles}>
				{[data][0] != undefined ? (
					data.map((article, index) => {
						console.log(article, "index");
						return (
							<li className={styles.article} key={article.ArticleDBModel.id}>
								<a href={`htt ${article.ArticleDBModel.author_id}`}>Автор</a>{" "}
								<br />
								<h3>
									<a href="">
										Заголовок {article.ArticleDBModel.title} <br />
									</a>
								</h3>
								<p className={styles.article__date}>
									Дата создания{" "}
									{new Date(
										article.ArticleDBModel.created_at
									).toLocaleDateString()}{" "}
								</p>
								<br />
								Количество лайков {article.ArticleDBModel.likes} <br />
								Содержание {article.ArticleDBModel.body} <br />
							</li>
						);
					})
				) : (
					<h1>Нету статей</h1>
				)}
			</ul>
		</>
	);
};
