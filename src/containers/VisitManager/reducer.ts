import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs, {Dayjs} from "dayjs";

import {VisitManagerPageReducerState} from "./types.ts";
import {VisitItemInterface} from "../UserVisitOverview/types.ts";

export const REDUCER_KEY = 'VISIT_MANAGER_PAGE';

const initialState: VisitManagerPageReducerState = {
    selectedDate: dayjs(new Date()),
    selectedTermId: null,
    allTerms: [],
    visitItemsData: [],
    isCreateVisitDialogOpen: false,
    isLoading: false,
    isCalendarLoading: false
}

const setSelectedDate: CaseReducer<VisitManagerPageReducerState, PayloadAction<any>> =
    (state, action) => {
        state.selectedDate = action.payload;
    };

const setFutureTerms: CaseReducer<VisitManagerPageReducerState, PayloadAction<Dayjs[]>> =
    (state, action) => {
        state.allTerms = action.payload;
    };

const setSelectedTermId: CaseReducer<VisitManagerPageReducerState, PayloadAction<number>> =
    (state, action) => {
        state.selectedTermId = action.payload;
    };

const setIsCreateVisitDialogOpen: CaseReducer<VisitManagerPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isCreateVisitDialogOpen = action.payload;
    };

const setIsLoading: CaseReducer<VisitManagerPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const setIsCalendarLoading: CaseReducer<VisitManagerPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isCalendarLoading = action.payload;
    };

const setVisitItemsData: CaseReducer<VisitManagerPageReducerState, PayloadAction<VisitItemInterface[]>> =
    (state, action) => {
        state.visitItemsData = action.payload;
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setSelectedDate,
        setSelectedTermId,
        setIsCreateVisitDialogOpen,
        setVisitItemsData,
        setIsLoading,
        setIsCalendarLoading,
        setFutureTerms
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
