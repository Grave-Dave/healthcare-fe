import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs from "dayjs";

import {AdminPanelPageReducerState} from "./types.ts";
import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";
import {User} from "../../layouts/Layout/types.ts";


export const REDUCER_KEY = 'ADMIN_PANEL_PAGE';

const initialState: AdminPanelPageReducerState = {
    selectedDate: dayjs(new Date()),
    pastTerms: [],
    pastVisitsData: [],
    userVisitsData: [],
    usersData: [],
    isSelectorLoading: false,
    isLoading: false,
    isCalendarLoading: false
}

const setSelectedDate: CaseReducer<AdminPanelPageReducerState, PayloadAction<any>> =
    (state, action) => {
        state.selectedDate = action.payload;
    };

const setPastTerms: CaseReducer<AdminPanelPageReducerState, PayloadAction<number[]>> =
    (state, action) => {
        state.pastTerms = action.payload;
    };

const setIsLoading: CaseReducer<AdminPanelPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isLoading = action.payload;
    };

const setIsCalendarLoading: CaseReducer<AdminPanelPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isCalendarLoading = action.payload;
    };

const setIsSelectorLoading: CaseReducer<AdminPanelPageReducerState, PayloadAction<boolean>> =
    (state, action) => {
        state.isSelectorLoading = action.payload;
    };

const setPastVisitsData: CaseReducer<AdminPanelPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.pastVisitsData = action.payload;
    };

const setUserVisitsData: CaseReducer<AdminPanelPageReducerState, PayloadAction<VisitItemInterfaceWithUser[]>> =
    (state, action) => {
        state.userVisitsData = action.payload;
    };

const setUsersData: CaseReducer<AdminPanelPageReducerState, PayloadAction<User[]>> =
    (state, action) => {
        state.usersData = action.payload
    };


const slice = createSlice({
    name: REDUCER_KEY,
    initialState: initialState,
    reducers: {
        setSelectedDate,
        setPastTerms,
        setUsersData,
        setUserVisitsData,
        setPastVisitsData,
        setIsLoading,
        setIsCalendarLoading,
        setIsSelectorLoading,
    }
})

export const reducerKey = slice.name;
export const reducer = slice.reducer;
export const actions = slice.actions;
