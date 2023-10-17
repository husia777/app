export interface ArticleResponse {
	ArticleDBModel: {
		id: number;
		body: string;
		title: string;
		author_id: number;
		created_at: Date;
		likes: number;
	};
}

// export interface ArticleViewResponse {
// 	[key: number]: {
// 		ArticleDBModel: {
// 			id: number;
// 			body: string;
// 			title: string;
// 			author_id: number;
// 			created_at: string;
// 			likes: number;
// 		};
// 	};
// }

export interface ArticleCreate {
	body: string;
	title: string;
	author_id: number;
}

export interface ArticleUpdateResponse {
	title: string;
	body: string;
}
