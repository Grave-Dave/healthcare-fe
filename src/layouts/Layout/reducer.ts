import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LayoutReducerState, SmoothSnackbarEnum, SmoothSnackbarState, User} from "./types.ts";
import {DEFAULT_SNACKBAR, DEFAULT_USER_DATA} from "./constants.ts";

export const REDUCER_KEY = 'LAYOUT';

const initialState: LayoutReducerState = {
    userState: {
        user: DEFAULT_USER_DATA,
        isLogged: false,
        isAdmin: false,
    },
    snackBarState: {
        isSnackBarOpen: false,
        message: '',
        autoHideDuration: 5000,
        type: SmoothSnackbarEnum.INFO
    },
    isMobileMenuOpen: false,
    isUserMenuOpen: false,
    isLoading: false
}

const setUserData: CaseReducer<LayoutReducerState, PayloadAction<User>> =
    (state, action) => {
        state.userState.user = action.payload;
    };

const setIsLogged: CaseReducer<LayoutReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.userState.isLogged = action.payload;
    };

const setIsAdmin: CaseReducer<LayoutReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.userState.isAdmin = action.payload;
    };

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

const setIsLoading: CaseReducer<LayoutReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setUserData,
        setIsLogged,
        setIsAdmin,
        setMobileMenuOpen,
        setUserMenuOpen,
        showSnackBar,
        closeSnackBar,
        setIsLoading
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;