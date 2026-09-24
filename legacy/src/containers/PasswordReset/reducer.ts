import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {
    PasswordResetPageReducerState
} from "./types.ts";

export const REDUCER_KEY = 'PASSWORD_RESET_PAGE';

const initialState: PasswordResetPageReducerState = {
    isLoading: false,
}

const setIsLoading: CaseReducer<PasswordResetPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setIsLoading,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
