import {REDUCER_KEY} from "./reducer.ts";
import {RootState} from "../../main.tsx";


export const getSelectedDate = (state: RootState) => state[REDUCER_KEY].selectedDate;
export const getSelectedTermId = (state: RootState) => state[REDUCER_KEY].selectedTermId;
export const getIsCreateVisitDialogOpen = (state: RootState) => state[REDUCER_KEY].isCreateVisitDialogOpen;
export const getVisitItemsData = (state: RootState) => state[REDUCER_KEY].visitItemsData;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getSelectedDate,
    getSelectedTermId,
    getIsCreateVisitDialogOpen,
    getVisitItemsData,
    getIsLoading
}
