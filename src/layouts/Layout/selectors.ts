import {REDUCER_KEY} from "./reducer.ts";

export const getTestValue = (state: any) => state.reducers[REDUCER_KEY].testValue;

export default {
    getTestValue
}