import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";

export const getIsMobileMenuOpen = (state: RootState) => state[REDUCER_KEY].isMobileMenuOpen;
export const getIsUserMenuOpen = (state: RootState) => state[REDUCER_KEY].isUserMenuOpen;
export const getSnackBars = (state: RootState) => state[REDUCER_KEY].snackBarStack;

export default {
    getIsMobileMenuOpen,
    getIsUserMenuOpen,
    getSnackBars,
}
