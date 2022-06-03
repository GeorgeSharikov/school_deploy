import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleApi} from "../../../shared/api/api.js";
import * as selectors from './selectors.js'

export const getFeedArticles = createAsyncThunk(
    'article/getFeedArticles',
    async (page, thunkAPI) => {
        const {data} = await ArticleApi.getFeedArticlesByPortions(page)
        return data
    }
)

export const getArticlesTotalCount = createAsyncThunk(
    'article/getArticlesTotalCount',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getArticlesTotalCount(params)
        return data
    }
)


export const addBookmark = createAsyncThunk(
    'article/addBookmark',
    async (articleId, thunkAPI) => {
        const {data} = await ArticleApi.addBookmark(articleId)
        return data
    }
)

export const getBookmarks = createAsyncThunk(
    'article/getBookmarks',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getBookmarks()
        return data
    }
)

const slice = createSlice({
    name: 'article',
    initialState: {
        feedArticles: [],
        totalArticlesCount: 0,
        userBookmarks: [],
    },
    reducers: {
        setFeedArticles(state, {payload}){
            state.feedArticles = payload
            state.totalArticlesCount = 0
        },
        setEmpty(state, {payload}){
            state.feedArticles = []
            state.totalArticlesCount = 0
            state.userBookmarks = []
        }
    },
    extraReducers: builder => {
        builder.addCase(getFeedArticles.fulfilled, (state, {payload}) => {
            state.feedArticles = [...state.feedArticles, ...payload]
        })
        builder.addCase(getArticlesTotalCount.fulfilled, (state, {payload}) => {
            state.totalArticlesCount = payload.totalCount
        })
        builder.addCase(addBookmark.fulfilled, (state, {payload}) => {
            state.userBookmarks = payload
        })
        builder.addCase(getBookmarks.fulfilled, (state, {payload}) => {
            state.userBookmarks = payload
        })
    }
})

const {actions: sliceActions, reducer} = slice
export const articleSelectors = selectors
export const articleActions = sliceActions
export const articleSlice = reducer