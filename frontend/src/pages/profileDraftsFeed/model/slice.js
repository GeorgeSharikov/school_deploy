import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ArticleApi} from "../../../shared/api/api.js";
import * as selectors from './selectors.js'

export const getDraftsById = createAsyncThunk(
    'profileDrafts/getFeedArticlesById',
    async ({page, id}, thunkAPI) => {
        const {data} = await ArticleApi.getDraftsArticles(page, id)
        return data
    }
)

export const getDraftsTotalCount = createAsyncThunk(
    'profileDrafts/getArticlesTotalCount',
    async (params, thunkAPI) => {
        const {data} = await ArticleApi.getDraftsTotalCount()
        return data
    }
)

const slice = createSlice({
    name: 'profileDrafts',
    initialState: {
        feedArticles: [],
        totalArticlesCount: 0,
    },
    reducers: {
        setDrafts(state, {payload}){
            state.feedArticles = []
            state.totalArticlesCount = 0
        },
    },
    extraReducers: builder => {
        builder.addCase(getDraftsById.fulfilled, (state, {payload}) => {
            state.feedArticles = [...state.feedArticles, ...payload]
        })
        builder.addCase(getDraftsTotalCount.fulfilled, (state, {payload}) => {
            state.totalArticlesCount = payload.totalCount
        })
    }
})

const {actions: sliceActions, reducer} = slice
export const draftsSelectors = selectors
export const draftsActions = sliceActions
export const draftsSlice = reducer