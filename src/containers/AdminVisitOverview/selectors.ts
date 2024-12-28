import {RootState} from "../../main.tsx";
import {REDUCER_KEY} from "./reducer.ts";


export const getIncomingConfirmedVisitsData = (state: RootState) => state[REDUCER_KEY].incomingConfirmedVisitsData;
export const getIncomingPendingVisitsData = (state: RootState) => state[REDUCER_KEY].incomingPendingVisitsData;
export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getIsLoading,
    getIncomingConfirmedVisitsData,
    getIncomingPendingVisitsData
}
