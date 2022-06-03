import {createSlice} from "@reduxjs/toolkit";
import * as selectors from './selectors.js'

const slice = createSlice({
    name: 'sideBarToggle',
    initialState: {
        isActive: true
    },
    reducers: {
        setActive(state, action) {
            state.isActive = !state.isActive
            return state
        },
    },
})

const { actions: sliceActions, reducer } = slice
export const sideBarSelectors = selectors
export const toggleActions = sliceActions
export const sideBarToggleSlice = reducer
