import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleApi} from "../../../shared/api/api.js";
import * as selectors from './selectors.js'

export const getAdminModerationArticles = createAsyncThunk(
    'adminModeration/getAdminModerationArticles',
    async (page, thunkAPI) => {
        const {data} = await ArticleApi.getModerationArticles(page)
        return data
    }
)

export const getAdminModerationTotalCount = createAsyncThunk(
    'adminModeration/getAdminModerationTotalCount',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getModerationTotalCount()
        return data
    }
)

const slice = createSlice({
    name: 'adminModeration',
    initialState: {
        feedArticles: [],
        totalArticlesCount: 0,
    },
    reducers: {
        setAdminModeration(state, {payload}){
            state.feedArticles = []
            state.totalArticlesCount = 0
        },
    },
    extraReducers: builder => {
        builder.addCase(getAdminModerationArticles.fulfilled, (state, {payload}) => {
            state.feedArticles = [...state.feedArticles, ...payload]
        })
        builder.addCase(getAdminModerationTotalCount.fulfilled, (state, {payload}) => {
            state.totalArticlesCount = payload.totalCount
        })
    }
})

const {actions: sliceActions, reducer} = slice
export const adminModerationSelectors = selectors
export const adminModerationActions = sliceActions
export const adminModerationSlice = reducer