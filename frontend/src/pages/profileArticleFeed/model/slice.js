import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleApi} from "../../../shared/api/api.js";
import * as selectors from './selectors.js'

export const getFeedArticlesById = createAsyncThunk(
    'profileArticles/getFeedArticlesById',
    async ({page, id}, thunkAPI) => {
        const {data} = await ArticleApi.getFeedArticlesById(page, id)
        return data
    }
)

export const getProfileArticlesTotalCount = createAsyncThunk(
    'profileArticles/getArticlesTotalCount',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getArticlesTotalCount(params)
        return data
    }
)

const slice = createSlice({
    name: 'profileArticles',
    initialState: {
        feedArticles: [],
        totalArticlesCount: 0,
    },
    reducers: {
        setProfileArticles(state, {payload}){
            state.feedArticles = []
            state.totalArticlesCount = 0
        },
    },
    extraReducers: builder => {
        builder.addCase(getFeedArticlesById.fulfilled, (state, {payload}) => {
            state.feedArticles = [...state.feedArticles, ...payload]
        })
        builder.addCase(getProfileArticlesTotalCount.fulfilled, (state, {payload}) => {
            state.totalArticlesCount = payload.totalCount
        })
    }
})

const {actions: sliceActions, reducer} = slice
export const articlesProfileSelectors = selectors
export const articlesProfileActions = sliceActions
export const articlesProfileSlice = reducer