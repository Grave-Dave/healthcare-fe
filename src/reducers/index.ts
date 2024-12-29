import {combineReducers} from "@reduxjs/toolkit";

import {reducer as layoutReducer, REDUCER_KEY as LAYOUT_REDUCER_KEY} from "../layouts/Layout/reducer.js";
import {reducer as visitReducer, REDUCER_KEY as VISIT_REDUCER_KEY} from "../containers/UserVisitOverview/reducer.ts";
import {reducer as loginPageReducer, REDUCER_KEY as LOGIN_PAGE_REDUCER_KEY} from "../containers/Login/reducer.ts";
import {reducer as authReducer, REDUCER_KEY as AUTH_REDUCER_KEY} from "../auth/reducer.ts";
import {reducer as userDataReducer, REDUCER_KEY as USER_DATA_REDUCER_KEY} from "../containers/UserAccount/reducer.ts";
import {reducer as adminPanelReducer, REDUCER_KEY as ADMIN_PANEL_REDUCER_KEY} from "../containers/AdminPanel/reducer.ts";
import {
    reducer as adminVisitReducer,
    REDUCER_KEY as ADMIN_VISIT_REDUCER_KEY
} from "../containers/AdminVisitOverview/reducer.ts";
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
    [USER_DATA_REDUCER_KEY]: userDataReducer,
    [VISIT_REDUCER_KEY]: visitReducer,
    [ADMIN_VISIT_REDUCER_KEY]: adminVisitReducer,
    [ADMIN_PANEL_REDUCER_KEY]: adminPanelReducer,
})
