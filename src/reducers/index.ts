import sortBy from "lodash/sortBy";
import fromPairs from "lodash/fromPairs";
import map from "lodash/map";

import {reducer as layoutReducer, REDUCER_KEY as LAYOUT_REDUCER_KEY} from "../layouts/Layout/reducer.js";
import {reducer as loginPageReducer, REDUCER_KEY as LOGIN_PAGE_REDUCER_KEY} from "../containers/Login/reducer.ts";
import {reducer as authReducer, REDUCER_KEY as AUTH_REDUCER_KEY} from "../auth/reducer.ts";
import {
    reducer as registerPageReducer,
    REDUCER_KEY as REGISTER_PAGE_REDUCER_KEY
} from "../containers/Register/reducer.ts";

const sortByKeys = (object: any) => {
    const keys = Object.keys(object);
    const sortedKeys = sortBy(keys);

    return fromPairs(
        map(sortedKeys, key => [key, object[key]])
    );
};

export const rootReducer = sortByKeys({
    [LAYOUT_REDUCER_KEY]: layoutReducer,
    [REGISTER_PAGE_REDUCER_KEY]: registerPageReducer,
    [LOGIN_PAGE_REDUCER_KEY]: loginPageReducer,
    [AUTH_REDUCER_KEY]: authReducer,
})
