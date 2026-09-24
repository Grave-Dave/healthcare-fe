import {v4 as uuidv4} from 'uuid';
import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LayoutReducerState, SmoothSnackbarState} from "./types.ts";
import {DEFAULT_SNACKBAR} from "./constants.ts";

export const REDUCER_KEY = 'LAYOUT';

const initialState: LayoutReducerState = {
    snackBarStack: [],
    isMobileMenuOpen: false,
    isUserMenuOpen: false,
}

const setMobileMenuOpen: CaseReducer<LayoutReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isMobileMenuOpen = action.payload;
    };

const setUserMenuOpen: CaseReducer<LayoutReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isUserMenuOpen = action.payload;
    };

const showSnackBar: CaseReducer<LayoutReducerState, PayloadAction<Partial<SmoothSnackbarState>>> =
    (state, action) => {
        state.snackBarStack = [...state.snackBarStack,
            {
                ...DEFAULT_SNACKBAR,
                ...action.payload,
                id: uuidv4(),
                isSnackBarOpen: true
            }]
    };

const closeSnackBar: CaseReducer<LayoutReducerState, PayloadAction<string>> =
    (state, action) => {
        state.snackBarStack = state.snackBarStack.map(snackBar =>
            snackBar.id === action.payload
                ? {
                    ...snackBar,
                    isSnackBarOpen: false
                } : snackBar)
    };

const deleteSnackBar: CaseReducer<LayoutReducerState, PayloadAction<string>> =
    (state, action) => {
        state.snackBarStack = state.snackBarStack.filter(snackBar => snackBar.id !== action.payload)
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setMobileMenuOpen,
        setUserMenuOpen,
        showSnackBar,
        closeSnackBar,
        deleteSnackBar
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
