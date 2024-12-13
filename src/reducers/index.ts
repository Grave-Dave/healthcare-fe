import sortBy from "lodash/sortBy";
import fromPairs from "lodash/fromPairs";
import map from "lodash/map";
import {reducer as entryPageReducer, REDUCER_KEY as ENTRY_PAGE_REDUCER_KEY} from "../layouts/Layout/reducer.js";

const sortByKeys = (object: any) => {
    const keys = Object.keys(object);
    const sortedKeys = sortBy(keys);

    return fromPairs(
        map(sortedKeys, key => [key, object[key]])
    );
};

export const rootReducer = sortByKeys({
    [ENTRY_PAGE_REDUCER_KEY]: entryPageReducer
})
