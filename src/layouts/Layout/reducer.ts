import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EntryPageReducerState} from "./types.ts";

export const REDUCER_KEY = 'ENTRY_PAGE';

const initialState: EntryPageReducerState = {
    isMobileMenuOpen: false,
    isUserMenuOpen: false
}

const setMobileMenuOpen: CaseReducer<EntryPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isMobileMenuOpen = action.payload;
    };

const setUserMenuOpen: CaseReducer<EntryPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isUserMenuOpen = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setMobileMenuOpen,
        setUserMenuOpen
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;