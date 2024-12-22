import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";

export const getIsMobileMenuOpen = (state: RootState) => state[REDUCER_KEY].isMobileMenuOpen;
export const getIsUserMenuOpen = (state: RootState) => state[REDUCER_KEY].isUserMenuOpen;
export const getSnackBar = (state: RootState) => state[REDUCER_KEY].snackBarState;

export default {
    getIsMobileMenuOpen,
    getIsUserMenuOpen,
    getSnackBar,
}
