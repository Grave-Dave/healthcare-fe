import {REDUCER_KEY} from "./reducer.ts";

export const getIsMobileMenuOpen = (state: any) => state.reducers[REDUCER_KEY].isMobileMenuOpen;
export const getIsUserMenuOpen = (state: any) => state.reducers[REDUCER_KEY].isUserMenuOpen;
export const getSnackBar = (state: any) => state.reducers[REDUCER_KEY].snackBarState;
export const getUser = (state: any) => state.reducers[REDUCER_KEY].userState.user;
export const getIsAdmin = (state: any) => state.reducers[REDUCER_KEY].userState.isAdmin;
export const getIsLogged = (state: any) => state.reducers[REDUCER_KEY].userState.isLogged;
export const getIsLoading = (state: any) => state.reducers[REDUCER_KEY].isLoading;

export default {
    getIsMobileMenuOpen,
    getIsUserMenuOpen,
    getIsLogged,
    getIsAdmin,
    getUser,
    getSnackBar,
    getIsLoading
}
