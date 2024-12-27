import {RootState} from "../../main.tsx";
import {REDUCER_KEY} from "./reducer.ts";


export const getUserPastVisitsData = (state: RootState) => state[REDUCER_KEY].userPastVisitsData;
export const getUserIncomingVisitsData = (state: RootState) => state[REDUCER_KEY].userIncomingVisitsData;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getIsLoading,
    getUserIncomingVisitsData,
    getUserPastVisitsData
}
