import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LayoutReducerState, SmoothSnackbarEnum, SmoothSnackbarState} from "./types.ts";
import {DEFAULT_SNACKBAR} from "./constants.ts";

export const REDUCER_KEY = 'LAYOUT';

const initialState: LayoutReducerState = {
    snackBarState: {
        isSnackBarOpen: false,
        message: '',
        autoHideDuration: 5000,
        type: SmoothSnackbarEnum.INFO
    },
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
        state.snackBarState = {
            ...state.snackBarState,
            isSnackBarOpen: true,
            ...action.payload
        }
    };

const closeSnackBar: CaseReducer<LayoutReducerState> =
    (state) => {
        state.snackBarState = DEFAULT_SNACKBAR
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setMobileMenuOpen,
        setUserMenuOpen,
        showSnackBar,
        closeSnackBar,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
