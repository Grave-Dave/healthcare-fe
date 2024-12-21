import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {AuthReducerState} from "./types.ts";
import {DEFAULT_USER_DATA} from "../layouts/Layout/constants.ts";
import {User} from "../layouts/Layout/types.ts";

export const REDUCER_KEY = 'AUTH';

const initialState: AuthReducerState = {
    accessToken: null,
    isAuthenticated: undefined,
    isAdmin: false,
    userState: {
        user: DEFAULT_USER_DATA,
    },
    isLoading: false
}

const setAccessToken: CaseReducer<AuthReducerState, PayloadAction<string>> =
    (state, action) => {
        state.accessToken = action.payload
    };

const clearAccessToken: CaseReducer<AuthReducerState> =
    (state) => {
        state.accessToken = null
    };

const setIsAuthenticated: CaseReducer<AuthReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isAuthenticated = action.payload;
    };

const setIsAdmin: CaseReducer<AuthReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isAdmin = action.payload;
    };

const setUserData: CaseReducer<AuthReducerState, PayloadAction<User>> =
    (state, action) => {
        state.userState.user = action.payload;
    };

const setIsLoading: CaseReducer<AuthReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setAccessToken,
        clearAccessToken,
        setIsAuthenticated,
        setIsAdmin,
        setUserData,
        setIsLoading
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
