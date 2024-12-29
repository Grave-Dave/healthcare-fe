import {RootState} from "../../main.tsx";
import {REDUCER_KEY} from "./reducer.ts";


export const getAdminSelectedDate = (state: RootState) => state[REDUCER_KEY].selectedDate;
export const getPastTerms = (state: RootState) => state[REDUCER_KEY].pastTerms;
export const getPastVisitsData = (state: RootState) => state[REDUCER_KEY].pastVisitsData;
export const getUsersData = (state: RootState) => state[REDUCER_KEY].usersData;
export const getUserVisitsData = (state: RootState) => state[REDUCER_KEY].userVisitsData;
export const getIsAdminCalendarLoading = (state: RootState) => state[REDUCER_KEY].isCalendarLoading;
export const getIsUserSelectorLoading = (state: RootState) => state[REDUCER_KEY].isSelectorLoading;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getIsLoading,
    getAdminSelectedDate,
    getPastTerms,
    getPastVisitsData,
    getUsersData,
    getUserVisitsData,
    getIsAdminCalendarLoading,
    getIsUserSelectorLoading,
}
