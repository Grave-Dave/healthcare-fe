import {REDUCER_KEY} from "./reducer.ts";

export const getLoginForm = (state: any) => state.reducers[REDUCER_KEY].loginForm;
export const getLoginFormError = (state: any) => state.reducers[REDUCER_KEY].loginFormError;
export const getIsLoading = (state: any) => state.reducers[REDUCER_KEY].isLoading;

export default {
    getLoginForm,
    getLoginFormError,
    getIsLoading
}
