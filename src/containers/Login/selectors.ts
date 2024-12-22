import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";

export const getLoginForm = (state: RootState) => state[REDUCER_KEY].loginForm;
export const getLoginFormError = (state: RootState) => state[REDUCER_KEY].loginFormError;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getLoginForm,
    getLoginFormError,
    getIsLoading,
}
