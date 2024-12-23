import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserAccountReducerState} from "./types.ts";
import {DEFAULT_REGISTER_FORM, DEFAULT_REGISTER_FORM_ERROR} from "../Register/constants.ts";
import {RegisterForm, RegisterFormError} from "../Register/types.ts";

export const REDUCER_KEY = 'USER_ACCOUNT_PAGE';

const initialState: UserAccountReducerState = {
    userDataForm: DEFAULT_REGISTER_FORM,
    userDataFormError: DEFAULT_REGISTER_FORM_ERROR,
    isLoading: false,
}

const setUserDataForm: CaseReducer<UserAccountReducerState, PayloadAction<Partial<RegisterForm>>> =
    (state, action) => {
        state.userDataForm = {
            ...state.userDataForm,
            ...action.payload
        };
    };
const setUserDataFormInput: CaseReducer<UserAccountReducerState, PayloadAction<{ key: string, value: string }>> =
    (state, action) => {
        state.userDataForm = {
            ...state.userDataForm,
            [action.payload.key]: action.payload.key !== 'phone' ? action.payload.value.trim() : action.payload.value
        };
    };

const resetUserDataForm: CaseReducer<UserAccountReducerState, PayloadAction<RegisterForm>> =
    (state, action) => {
        state.userDataForm = action.payload
    };

const setUserDataFormError: CaseReducer<UserAccountReducerState, PayloadAction<Partial<RegisterFormError>>> =
    (state, action) => {
        state.userDataFormError = {
            ...state.userDataFormError,
            ...action.payload
        };
    };

const resetUserDataFormError: CaseReducer<UserAccountReducerState, PayloadAction<RegisterFormError>> =
    (state, action) => {
        state.userDataFormError = action.payload
    };

const setIsLoading: CaseReducer<UserAccountReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setUserDataForm,
        resetUserDataForm,
        setIsLoading,
        setUserDataFormError,
        resetUserDataFormError,
        setUserDataFormInput
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
