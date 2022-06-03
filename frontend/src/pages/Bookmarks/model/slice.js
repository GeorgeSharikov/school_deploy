import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleApi} from "../../../shared/api/api.js";
import * as selectors from './selectors.js'

export const getBookmarksById = createAsyncThunk(
    'Bookmarks/getBookmarksById',
    async (page, thunkAPI) => {
        const {data} = await ArticleApi.getFeedArticlesByBookmarks(page)
        return data
    }
)

export const getBookmarksTotalCount = createAsyncThunk(
    'Bookmarks/getBookmarksTotalCount',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getBookmarksTotalCount()
        return data
    }
)

const slice = createSlice({
    name: 'Bookmarks',
    initialState: {
        feedArticles: [],
        totalArticlesCount: 0,
    },
    reducers: {
        setBookmarks(state, {payload}){
            state.feedArticles = []
            state.totalArticlesCount = 0
        },
    },
    extraReducers: builder => {
        builder.addCase(getBookmarksById.fulfilled, (state, {payload}) => {
            state.feedArticles = [...state.feedArticles, ...payload]
        })
        builder.addCase(getBookmarksTotalCount.fulfilled, (state, {payload}) => {
            state.totalArticlesCount = payload.totalCount
        })
    }
})

const {actions: sliceActions, reducer} = slice
export const BookmarksSelectors = selectors
export const BookmarksActions = sliceActions
export const BookmarksSlice = reducer