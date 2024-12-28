import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AdminVisitOverviewPageReducerState} from "./types.ts";
import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";

export const REDUCER_KEY = 'ADMIN_VISIT_OVERVIEW_PAGE';

const initialState: AdminVisitOverviewPageReducerState = {
    incomingPendingVisitsData: [],
    incomingConfirmedVisitsData: [],
    isLoading: false,
}

const setIncomingPendingVisits: CaseReducer<AdminVisitOverviewPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.incomingPendingVisitsData = action.payload;
    };

const setIncomingConfirmedVisits: CaseReducer<AdminVisitOverviewPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.incomingConfirmedVisitsData = action.payload;
    };

const setIsLoading: CaseReducer<AdminVisitOverviewPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setIncomingPendingVisits,
        setIncomingConfirmedVisits,
        setIsLoading,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
