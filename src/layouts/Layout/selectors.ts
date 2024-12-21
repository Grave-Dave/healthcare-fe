import {REDUCER_KEY} from "./reducer.ts";

export const getIsMobileMenuOpen = (state: any) => state.reducers[REDUCER_KEY].isMobileMenuOpen;
export const getIsUserMenuOpen = (state: any) => state.reducers[REDUCER_KEY].isUserMenuOpen;
export const getSnackBar = (state: any) => state.reducers[REDUCER_KEY].snackBarState;

export default {
    getIsMobileMenuOpen,
    getIsUserMenuOpen,
    getSnackBar,
}
