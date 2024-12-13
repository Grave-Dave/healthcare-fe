import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EntryPageReducerState} from "./types.ts";

export const REDUCER_KEY = 'ENTRY_PAGE';

const initialState: EntryPageReducerState = {
    testValue: false
}

const setTestValue: CaseReducer<EntryPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.testValue = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setTestValue
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;