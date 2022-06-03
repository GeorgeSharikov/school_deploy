import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as selectors from './selectors.js'
import {UserApi} from '../../shared/api/api'
import {deleteCookie} from "../../shared/helpers/deleteCookie.js";

export const checkUserAuth = createAsyncThunk(
    'userInfo/checkUserAuth',
    async (parametrs, thunkAPI) => {
        const {data} = await UserApi.checkAuth()
        return data
    }
)

export const userLogIn = createAsyncThunk(
    'userInfo/userLogIn',
    async (parametrs, thunkAPI) => {
        const {data} = await UserApi.login(parametrs)

        return data
    }
)

const slice = createSlice({
    name: 'userInfo',
    initialState: {
        isAuth: false,
        userId: null,
        role: false,
        errorLoginMessage: null
    },
    reducers: {
        setIsAuth(state, {payload}){
            console.log(payload)
            state.isAuth = payload.isAuth;
        },
        setUserInfo(state, {payload}){
            state.userId = payload.userId;
            state.role = payload.role;
        },
        setLoginError(state, {payload}){
            state.errorLoginMessage = payload
        },
        logOut(state, {payload}){
            state.isAuth = false
            state.userId = null
            state.role = false
            state.errorLoginMessage = null
            deleteCookie()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkUserAuth.fulfilled, (state, {payload}) => {
            const decodedInfo = jwt_decode(payload.token)
            document.cookie = `token=${payload.token}`

            state.userId = decodedInfo.id
            state.role = decodedInfo.role
            state.isAuth = true
        })

        builder.addCase(userLogIn.fulfilled, (state, {payload}) => {
            const decodedInfo = jwt_decode(payload.token)
            document.cookie = `token=${payload.token}`

            state.userId = decodedInfo.id
            state.role = decodedInfo.role
            state.isAuth = true
            state.errorLoginMessage = null
        })

        builder.addCase(userLogIn.rejected, (state, action) => {
            state.errorLoginMessage = action.error.message
        })
    }
})

const { actions: sliceActions, reducer } = slice
export const userAuthSelectors = selectors
export const userAuthActions = sliceActions
export const userAuthSlice = reducer
