import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {LoginForm, LoginFormError, LoginPageReducerState} from "./types.ts";
import {DEFAULT_LOGIN_FORM, DEFAULT_LOGIN_FORM_ERROR} from "./constants.ts";

export const REDUCER_KEY = 'LOGIN_PAGE';

const initialState: LoginPageReducerState = {
    loginForm: DEFAULT_LOGIN_FORM,
    loginFormError: DEFAULT_LOGIN_FORM_ERROR,
    isLoading: false,
}

const setLoginForm: CaseReducer<LoginPageReducerState, PayloadAction<{ key: string, value: string }>> =
    (state, action) => {
        state.loginForm = {
            ...state.loginForm,
            [action.payload.key]: action.payload.value.trim()
        };
    };

const resetLoginForm: CaseReducer<LoginPageReducerState, PayloadAction<LoginForm>> =
    (state, action) => {
        state.loginForm = action.payload
    };

const setLoginFormError: CaseReducer<LoginPageReducerState, PayloadAction<Partial<LoginFormError>>> =
    (state, action) => {
        state.loginFormError = {
            ...state.loginFormError,
            ...action.payload
        };
    };

const resetLoginFormError: CaseReducer<LoginPageReducerState, PayloadAction<LoginFormError>> =
    (state, action) => {
        state.loginFormError = action.payload
    };

const setIsLoading: CaseReducer<LoginPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setLoginForm,
        resetLoginForm,
        setLoginFormError,
        resetLoginFormError,
        setIsLoading,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
