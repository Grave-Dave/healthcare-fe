import {REDUCER_KEY} from "./reducer.ts";

export const getAccessToken = (state: any) => state.reducers[REDUCER_KEY].token;
export const getIsAuthenticated = (state: any) => state.reducers[REDUCER_KEY].isAuthenticated;
export const getIsAdmin = (state: any) => state.reducers[REDUCER_KEY].isAdmin;
export const getUser = (state: any) => state.reducers[REDUCER_KEY].userState.user;
export const getIsLoading = (state: any) => state.reducers[REDUCER_KEY].isLoading;

export default {
    getAccessToken,
    getIsAuthenticated,
    getIsAdmin,
    getUser,
    getIsLoading
}
