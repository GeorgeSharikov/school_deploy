import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfoApi } from "../../shared/api/api";
import * as selectors from './selectors'

export const getPersonalData = createAsyncThunk(
    'userPersonalData/getPersonalData',
    async (parametrs, thunkAPI) => {
        const {data} = await UserInfoApi.getPersonalData()
        return data
    }
)

export const getOtherPersonalData = createAsyncThunk(
    'userPersonalData/getOtherPersonalData',
    async ({id}, thunkAPI) => {
        const {data} = await UserInfoApi.getOtherPersonalData(id)
        return data
    }
)

const slice = createSlice({
    name: 'userPersonalData',
    initialState : {
        personalData : {},
        errorMessage: null,   
        otherAccountData: {},
        isFetching: true
    },
    reducers: {
        setEmptyPersonalData(state, {payload}){
            state.personalData = {}
            state.errorMessage = null
            state.otherAccountData = {}
            state.isFetching = false
        },
        changePersonalStatus(state, {payload}){
            state.personalData.status = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPersonalData.fulfilled, (state, {payload}) => {
            state.personalData = payload
            state.isFetching = false
        })

        builder.addCase(getPersonalData.rejected, (state, action) => {
            state.errorMessage = action.error.messages
            state.isFetching = false
        })

        builder.addCase(getOtherPersonalData.fulfilled, (state, {payload}) => {
            state.otherAccountData = payload
        })

        builder.addCase(getOtherPersonalData.rejected, (state, action) => {
            state.errorMessage = action.error.messages  
        })
    }
})

const { actions: sliceActions, reducer } = slice
export const personalDataSelectors = selectors
export const personalDataActions = sliceActions
export const personalDataSlice = reducer