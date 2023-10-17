import {
	useAppDispatch,
	useAppSelector,
} from "../../../../app/Store/redux-hook";
import { selectAllArticles } from "../../../../entities/article/model/article-selectors";
import React, { useEffect } from "react";
import { getAllArticleThunk } from "../models/get-all-article-thunk";
// import {  } from "../../../../entities/article/model/types";

export const Articles = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllArticleThunk(null));
	}, [dispatch]);

	const data = useAppSelector(selectAllArticles)[0];

	{
		console.log([[data][0]].length);
		console.log([data]);
		console.log([data][0]);
	}
	return (
		<>
			<h1>2</h1>
			<ul>
				{[data][0] != undefined ? (
					[data].map((article) => {
						console.log(article, "index");
						console.log(article.ArticleDBModel, "item");
						const { body, id, author_id, created_at, likes, title } =
							article.ArticleDBModel;
						console.log(body, "body");
						return (
							<li key={id}>
								<a href={`htt ${author_id}`}>Автор</a> <br />
								Дата создания {new Date(created_at).toLocaleDateString()} <br />
								Количество лайков {likes} <br />
								Заголовок {title} <br />
								Содержание {body} <br />
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
