import {VisitItemInterfaceWithUser, VisitOverviewPageReducerState} from "./types.ts";
import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const REDUCER_KEY = 'VISIT_OVERVIEW_PAGE';

const initialState: VisitOverviewPageReducerState = {
    userIncomingVisitsData: [],
    userPastVisitsData: [],
    isLoading: false,
}

const setUserIncomingVisits: CaseReducer<VisitOverviewPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.userIncomingVisitsData = action.payload;
    };

const setUserPastVisits: CaseReducer<VisitOverviewPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.userPastVisitsData = action.payload;
    };


const setIsLoading: CaseReducer<VisitOverviewPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setUserIncomingVisits,
        setUserPastVisits,
        setIsLoading,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
