import React, { useEffect } from "react";
import styles from "./my-articles.module.scss";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../../app/Store/redux-hook";
import { selectUserData } from "../../../../../../entities/user/model/user-selectors";
import { getMyArticlesThunk } from "../model/get-my-articles-thunk";
import { selectMyArticles } from "../../../../../../entities/article/model/article-selectors";
import { MdDelete } from "react-icons/md";
import { deleteArticleThunk } from "../../DeleteArticle/model/delete-article-thunk";
import { UserArticleResponse } from "../../../../../../entities/article/model/types";
import { deleteArticleAction } from "../../../../../../entities/article/model/article-slice";
import { successAlert } from "../../../../../../shared/ui/customAlert/custom-alert";

export const MyArticles = () => {
	const userData = useAppSelector(selectUserData);
	const userId = Number(userData.id);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getMyArticlesThunk(userId));
	}, [dispatch, userId]);
	const deleteArticle = async (article: UserArticleResponse) => {
		if (userId === article.author_id) {
			await dispatch(deleteArticleAction(article.id));
			await dispatch(deleteArticleThunk(article.id));
			successAlert("Статья успешно удалена");
		}
	};

	const data = useAppSelector(selectMyArticles);
	return (
		<div className={styles.articles}>
			<ul className={styles.articles}>
				{[data][0].length >= 1 ? (
					data.map((article) => {
						return (
							<li className={styles.article} key={article.id}>
								<a href={`http/users/${article.author_id}`}>Автор вы</a> <br />
								<h3>
									<a className={styles.articles__title} href="">
										{article.title} <br />
									</a>
								</h3>
								<p className={styles.article__date}>
									Дата создания{" "}
									{new Date(article.created_at).toLocaleDateString()}{" "}
								</p>
								<br />
								Количество лайков {article.likes} <br />
								Содержание {article.body} <br />
								<div className={styles.article__delete}>
									{userId === article.author_id ? (
										<MdDelete
											size={40}
											color="red"
											onClick={() => {
												deleteArticle(article);
											}}
										/>
									) : null}
								</div>
							</li>
						);
					})
				) : (
					<h2 className={styles.title}>Вы еще не создали ни одной статьи </h2>
				)}
			</ul>
		</div>
	);
};
