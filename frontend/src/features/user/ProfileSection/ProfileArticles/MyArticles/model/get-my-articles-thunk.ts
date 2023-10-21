import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleService } from "../../../../../../entities/article/api/article-api";


export const getMyArticlesThunk = createAsyncThunk(
    'user/articles', async () => {
        return ArticleService.
    }
)