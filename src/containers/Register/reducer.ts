import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegisterForm, RegisterFormError, RegisterPageReducerState} from "./types.ts";
import {DEFAULT_REGISTER_FORM, DEFAULT_REGISTER_FORM_ERROR} from "./constants.ts";

export const REDUCER_KEY = 'REGISTER_PAGE';

const initialState: RegisterPageReducerState = {
    registerForm: DEFAULT_REGISTER_FORM,
    registerFormError: DEFAULT_REGISTER_FORM_ERROR,
    isStatuteAccepted: false,
    isLoading: false,
}

const setRegisterForm: CaseReducer<RegisterPageReducerState, PayloadAction<{ key: string, value: string }>> =
    (state, action) => {
        state.registerForm = {
            ...state.registerForm,
            [action.payload.key]: action.payload.key !== 'phone' ? action.payload.value.trim() : action.payload.value
        };
    };

const resetRegisterForm: CaseReducer<RegisterPageReducerState, PayloadAction<RegisterForm>> =
    (state, action) => {
        state.registerForm = action.payload
    };

const setRegisterFormError: CaseReducer<RegisterPageReducerState, PayloadAction<Partial<RegisterFormError>>> =
    (state, action) => {
        state.registerFormError = {
            ...state.registerFormError,
            ...action.payload
        };
    };

const resetRegisterFormError: CaseReducer<RegisterPageReducerState, PayloadAction<RegisterFormError>> =
    (state, action) => {
        state.registerFormError = action.payload
    };

const setIsStatuteAccepted: CaseReducer<RegisterPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isStatuteAccepted = action.payload;
    };

const setIsLoading: CaseReducer<RegisterPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setRegisterForm,
        setRegisterFormError,
        setIsStatuteAccepted,
        setIsLoading,
        resetRegisterForm,
        resetRegisterFormError
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
