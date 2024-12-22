import {combineReducers} from "@reduxjs/toolkit";

import {reducer as layoutReducer, REDUCER_KEY as LAYOUT_REDUCER_KEY} from "../layouts/Layout/reducer.js";
import {reducer as loginPageReducer, REDUCER_KEY as LOGIN_PAGE_REDUCER_KEY} from "../containers/Login/reducer.ts";
import {reducer as authReducer, REDUCER_KEY as AUTH_REDUCER_KEY} from "../auth/reducer.ts";
import {
    reducer as visitManagerReducer,
    REDUCER_KEY as VISIT_MANAGER_REDUCER_KEY
} from "../containers/VisitManager/reducer.ts";
import {
    reducer as registerPageReducer,
    REDUCER_KEY as REGISTER_PAGE_REDUCER_KEY
} from "../containers/Register/reducer.ts";


export const rootReducer = combineReducers({
    [AUTH_REDUCER_KEY]: authReducer,
    [LAYOUT_REDUCER_KEY]: layoutReducer,
    [REGISTER_PAGE_REDUCER_KEY]: registerPageReducer,
    [LOGIN_PAGE_REDUCER_KEY]: loginPageReducer,
    [VISIT_MANAGER_REDUCER_KEY]: visitManagerReducer,
})
