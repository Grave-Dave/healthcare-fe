import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../main.tsx";

export const getAccessToken = (state: RootState) => state[REDUCER_KEY].accessToken;
export const getIsAuthenticated = (state: RootState) => state[REDUCER_KEY].isAuthenticated;
export const getIsAdmin = (state: RootState) => state[REDUCER_KEY].isAdmin;
export const getUser = (state: RootState) => state[REDUCER_KEY].userState.user;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getAccessToken,
    getIsAuthenticated,
    getIsAdmin,
    getUser,
    getIsLoading
}
